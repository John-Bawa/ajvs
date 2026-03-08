import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RichTextEditor } from "@/components/blog/RichTextEditor";
import { Save, Send, Eye, ArrowLeft, ImageIcon, Search as SearchIcon, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRoles } from "@/hooks/useUserRoles";
import { toast } from "sonner";
import type { BlogCategory, BlogTag, BlogPostFormData } from "@/types/blog";
import { generateSlug, calculateReadingTime } from "@/types/blog";

export default function AdminBlogEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { roles } = useUserRoles(user);
  const isEditing = !!id;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [allTags, setAllTags] = useState<BlogTag[]>([]);
  const [saving, setSaving] = useState(false);
  const [slugManual, setSlugManual] = useState(false);

  const [form, setForm] = useState<BlogPostFormData>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    featured_image: null,
    category_id: null,
    status: 'draft',
    post_type: 'article',
    seo_title: '',
    meta_description: '',
    keywords: [],
    og_image: null,
    scheduled_at: null,
    tag_ids: [],
  });

  const isAdmin = roles.some(r => ['super_admin', 'editor', 'secretary'].includes(r));

  useEffect(() => {
    fetchMeta();
    if (isEditing) fetchPost();
  }, [id]);

  const fetchMeta = async () => {
    const [catsRes, tagsRes] = await Promise.all([
      supabase.from('blog_categories').select('*').order('name'),
      supabase.from('blog_tags').select('*').order('name'),
    ]);
    if (catsRes.data) setCategories(catsRes.data as unknown as BlogCategory[]);
    if (tagsRes.data) setAllTags(tagsRes.data as unknown as BlogTag[]);
  };

  const fetchPost = async () => {
    if (!id) return;
    const { data } = await supabase
      .from('blog_posts')
      .select('*, blog_post_tags(tag_id)')
      .eq('id', id)
      .single();
    if (data) {
      const p = data as any;
      setForm({
        title: p.title,
        slug: p.slug,
        content: p.content,
        excerpt: p.excerpt || '',
        featured_image: p.featured_image,
        category_id: p.category_id,
        status: p.status,
        post_type: p.post_type || 'article',
        seo_title: p.seo_title || '',
        meta_description: p.meta_description || '',
        keywords: p.keywords || [],
        og_image: p.og_image,
        scheduled_at: p.scheduled_at,
        tag_ids: p.blog_post_tags?.map((t: any) => t.tag_id) || [],
      });
      setSlugManual(true);
    }
  };

  const updateField = <K extends keyof BlogPostFormData>(key: K, value: BlogPostFormData[K]) => {
    setForm(prev => {
      const next = { ...prev, [key]: value };
      if (key === 'title' && !slugManual) {
        next.slug = generateSlug(value as string);
      }
      return next;
    });
  };

  const handleFeaturedImage = async (file: File) => {
    const ext = file.name.split('.').pop();
    const path = `featured/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from('blog-images').upload(path, file);
    if (error) { toast.error('Upload failed'); return; }
    const { data } = supabase.storage.from('blog-images').getPublicUrl(path);
    updateField('featured_image', data.publicUrl);
    toast.success('Featured image uploaded');
  };

  const savePost = async (publishStatus?: 'draft' | 'published' | 'scheduled') => {
    if (!form.title.trim()) { toast.error('Title is required'); return; }
    if (!form.slug.trim()) { toast.error('Slug is required'); return; }
    if (!user) return;

    setSaving(true);
    const status = publishStatus || form.status;
    const readingTime = calculateReadingTime(form.content);

    const postData = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      content: form.content,
      excerpt: form.excerpt.trim() || null,
      featured_image: form.featured_image,
      category_id: form.category_id,
      author_id: user.id,
      status,
      seo_title: form.seo_title.trim() || null,
      meta_description: form.meta_description.trim() || null,
      keywords: form.keywords.length > 0 ? form.keywords : null,
      og_image: form.og_image,
      reading_time: readingTime,
      scheduled_at: status === 'scheduled' ? form.scheduled_at : null,
      published_at: status === 'published' ? new Date().toISOString() : null,
    };

    let postId = id;

    if (isEditing && id) {
      const { error } = await supabase.from('blog_posts').update(postData).eq('id', id);
      if (error) { toast.error('Failed to save: ' + error.message); setSaving(false); return; }
    } else {
      const { data, error } = await supabase.from('blog_posts').insert(postData).select('id').single();
      if (error) { toast.error('Failed to create: ' + error.message); setSaving(false); return; }
      postId = (data as any).id;
    }

    // Update tags
    if (postId) {
      await supabase.from('blog_post_tags').delete().eq('post_id', postId);
      if (form.tag_ids.length > 0) {
        await supabase.from('blog_post_tags').insert(
          form.tag_ids.map(tag_id => ({ post_id: postId!, tag_id }))
        );
      }
    }

    toast.success(status === 'published' ? 'Post published!' : 'Post saved!');
    setSaving(false);
    if (!isEditing && postId) navigate(`/admin/blog/editor/${postId}`);
  };

  const [keywordInput, setKeywordInput] = useState('');
  const addKeyword = () => {
    if (keywordInput.trim() && !form.keywords.includes(keywordInput.trim())) {
      updateField('keywords', [...form.keywords, keywordInput.trim()]);
      setKeywordInput('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumbs items={[
        { label: "Blog Management", href: "/admin/blog" },
        { label: isEditing ? "Edit Post" : "New Post" },
      ]} />

      <main className="flex-1 py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={() => navigate('/admin/blog')} className="gap-1">
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => savePost('draft')} disabled={saving}>
                <Save className="w-4 h-4 mr-2" /> Save Draft
              </Button>
              <Button onClick={() => savePost('published')} disabled={saving} className="bg-primary text-primary-foreground">
                <Send className="w-4 h-4 mr-2" /> Publish
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Editor */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title */}
              <div>
                <Input
                  placeholder="Post title"
                  value={form.title}
                  onChange={e => updateField('title', e.target.value)}
                  className="text-2xl font-serif font-bold h-14 border-none shadow-none px-0 focus-visible:ring-0 placeholder:text-muted-foreground/40"
                />
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-muted-foreground">Slug:</span>
                  <Input
                    value={form.slug}
                    onChange={e => { setSlugManual(true); updateField('slug', generateSlug(e.target.value)); }}
                    className="text-xs h-7 max-w-sm"
                  />
                </div>
              </div>

              {/* Rich Text Editor */}
              <RichTextEditor
                content={form.content}
                onChange={val => updateField('content', val)}
                placeholder="Start writing your article..."
              />

              {/* Excerpt */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Excerpt</Label>
                <Textarea
                  placeholder="Brief summary of the article (used in listings and SEO)..."
                  value={form.excerpt}
                  onChange={e => updateField('excerpt', e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Status */}
              <Card className="border-border/50">
                <CardHeader className="pb-3"><CardTitle className="text-sm">Status</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <Select value={form.status} onValueChange={v => updateField('status', v as any)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.status === 'scheduled' && (
                    <div>
                      <Label className="text-xs">Schedule Date</Label>
                      <Input
                        type="datetime-local"
                        value={form.scheduled_at || ''}
                        onChange={e => updateField('scheduled_at', e.target.value)}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Category */}
              <Card className="border-border/50">
                <CardHeader className="pb-3"><CardTitle className="text-sm">Category</CardTitle></CardHeader>
                <CardContent>
                  <Select value={form.category_id || ''} onValueChange={v => updateField('category_id', v || null)}>
                    <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>
                      {categories.map(c => (
                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card className="border-border/50">
                <CardHeader className="pb-3"><CardTitle className="text-sm">Tags</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {form.tag_ids.map(tid => {
                      const tag = allTags.find(t => t.id === tid);
                      return tag ? (
                        <Badge key={tid} variant="secondary" className="gap-1 text-xs">
                          {tag.name}
                          <button onClick={() => updateField('tag_ids', form.tag_ids.filter(i => i !== tid))} className="ml-0.5">
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ) : null;
                    })}
                  </div>
                  <Select onValueChange={v => { if (!form.tag_ids.includes(v)) updateField('tag_ids', [...form.tag_ids, v]); }}>
                    <SelectTrigger><SelectValue placeholder="Add tag" /></SelectTrigger>
                    <SelectContent>
                      {allTags.filter(t => !form.tag_ids.includes(t.id)).map(t => (
                        <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Featured Image */}
              <Card className="border-border/50">
                <CardHeader className="pb-3"><CardTitle className="text-sm">Featured Image</CardTitle></CardHeader>
                <CardContent>
                  {form.featured_image ? (
                    <div className="relative mb-3">
                      <img src={form.featured_image} alt="Featured" className="w-full h-40 object-cover rounded-lg" />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 h-7 w-7 p-0"
                        onClick={() => updateField('featured_image', null)}
                      >
                        <X className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  ) : (
                    <div
                      className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-smooth"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <ImageIcon className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Click to upload</p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={e => { const f = e.target.files?.[0]; if (f) handleFeaturedImage(f); e.target.value = ''; }}
                    className="hidden"
                  />
                </CardContent>
              </Card>

              {/* SEO */}
              <Card className="border-border/50">
                <Accordion type="single" collapsible>
                  <AccordionItem value="seo" className="border-none">
                    <AccordionTrigger className="px-6 py-3 text-sm font-semibold">SEO Settings</AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 space-y-3">
                      <div>
                        <Label className="text-xs">SEO Title</Label>
                        <Input
                          placeholder="Custom SEO title"
                          value={form.seo_title}
                          onChange={e => updateField('seo_title', e.target.value)}
                          maxLength={60}
                        />
                        <p className="text-xs text-muted-foreground mt-1">{form.seo_title.length}/60</p>
                      </div>
                      <div>
                        <Label className="text-xs">Meta Description</Label>
                        <Textarea
                          placeholder="SEO description"
                          value={form.meta_description}
                          onChange={e => updateField('meta_description', e.target.value)}
                          rows={2}
                          maxLength={160}
                        />
                        <p className="text-xs text-muted-foreground mt-1">{form.meta_description.length}/160</p>
                      </div>
                      <div>
                        <Label className="text-xs">Keywords</Label>
                        <div className="flex gap-2 mb-2">
                          <Input
                            placeholder="Add keyword"
                            value={keywordInput}
                            onChange={e => setKeywordInput(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addKeyword(); } }}
                          />
                          <Button type="button" variant="outline" size="sm" onClick={addKeyword}>Add</Button>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {form.keywords.map((kw, i) => (
                            <Badge key={i} variant="secondary" className="text-xs gap-1">
                              {kw}
                              <button onClick={() => updateField('keywords', form.keywords.filter((_, j) => j !== i))}>
                                <X className="w-3 h-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
