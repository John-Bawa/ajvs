import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus, Search, Edit, Trash2, Eye, FileText, Send, Clock,
  LayoutDashboard, Tag, FolderOpen, MoreVertical,
} from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRoles } from "@/hooks/useUserRoles";
import { toast } from "sonner";
import { format } from "date-fns";
import type { BlogPost, BlogCategory, BlogTag } from "@/types/blog";
import { generateSlug } from "@/types/blog";

export default function AdminBlog() {
  const { user } = useAuth();
  const { roles } = useUserRoles(user);
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [tags, setTags] = useState<BlogTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Category/Tag management
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDesc, setNewCategoryDesc] = useState("");
  const [newTagName, setNewTagName] = useState("");
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [tagDialogOpen, setTagDialogOpen] = useState(false);

  const isAdmin = roles.some(r => ['super_admin', 'editor', 'secretary'].includes(r));

  useEffect(() => {
    if (!isAdmin && !loading) {
      navigate('/dashboard');
      return;
    }
    fetchAll();
  }, [isAdmin]);

  const fetchAll = async () => {
    setLoading(true);
    const [postsRes, catsRes, tagsRes] = await Promise.all([
      supabase.from('blog_posts').select('*, blog_categories(*), blog_post_tags(blog_tags(*))').order('created_at', { ascending: false }),
      supabase.from('blog_categories').select('*').order('name'),
      supabase.from('blog_tags').select('*').order('name'),
    ]);
    if (postsRes.data) setPosts(postsRes.data as unknown as BlogPost[]);
    if (catsRes.data) setCategories(catsRes.data as unknown as BlogCategory[]);
    if (tagsRes.data) setTags(tagsRes.data as unknown as BlogTag[]);
    setLoading(false);
  };

  const deletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (error) toast.error('Failed to delete');
    else { toast.success('Post deleted'); fetchAll(); }
  };

  const addCategory = async () => {
    if (!newCategoryName.trim()) return;
    const slug = generateSlug(newCategoryName);
    const { error } = await supabase.from('blog_categories').insert({ name: newCategoryName.trim(), slug, description: newCategoryDesc.trim() || null });
    if (error) toast.error('Failed to create category');
    else { toast.success('Category created'); setNewCategoryName(''); setNewCategoryDesc(''); setCategoryDialogOpen(false); fetchAll(); }
  };

  const deleteCategory = async (id: string) => {
    if (!confirm('Delete this category?')) return;
    const { error } = await supabase.from('blog_categories').delete().eq('id', id);
    if (error) toast.error('Failed to delete');
    else { toast.success('Category deleted'); fetchAll(); }
  };

  const addTag = async () => {
    if (!newTagName.trim()) return;
    const slug = generateSlug(newTagName);
    const { error } = await supabase.from('blog_tags').insert({ name: newTagName.trim(), slug });
    if (error) toast.error('Failed to create tag');
    else { toast.success('Tag created'); setNewTagName(''); setTagDialogOpen(false); fetchAll(); }
  };

  const deleteTag = async (id: string) => {
    if (!confirm('Delete this tag?')) return;
    const { error } = await supabase.from('blog_tags').delete().eq('id', id);
    if (error) toast.error('Failed to delete');
    else { toast.success('Tag deleted'); fetchAll(); }
  };

  const filtered = posts.filter(p => {
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: posts.length,
    published: posts.filter(p => p.status === 'published').length,
    draft: posts.filter(p => p.status === 'draft').length,
    scheduled: posts.filter(p => p.status === 'scheduled').length,
  };

  const statusColor = (s: string) => {
    switch (s) {
      case 'published': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'draft': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'scheduled': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      default: return '';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumbs items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Blog Management" }]} />

      <main className="flex-1 py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-foreground flex items-center gap-2">
                <LayoutDashboard className="w-7 h-7 text-primary" /> Blog Management
              </h1>
              <p className="text-muted-foreground mt-1">Create, manage, and publish articles</p>
            </div>
            <Link to="/admin/blog/editor">
              <Button className="bg-primary text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" /> New Post
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Posts', value: stats.total, icon: FileText, color: 'text-primary' },
              { label: 'Published', value: stats.published, icon: Send, color: 'text-green-600' },
              { label: 'Drafts', value: stats.draft, icon: Edit, color: 'text-yellow-600' },
              { label: 'Scheduled', value: stats.scheduled, icon: Clock, color: 'text-blue-600' },
            ].map(s => (
              <Card key={s.label} className="border-border/50">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center ${s.color}`}>
                    <s.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filters + Management */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search posts..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
            </div>
            <div className="flex gap-2">
              {['all', 'published', 'draft', 'scheduled'].map(s => (
                <Button key={s} variant={statusFilter === s ? 'default' : 'outline'} size="sm" onClick={() => setStatusFilter(s)} className="capitalize">
                  {s}
                </Button>
              ))}
            </div>
            <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm"><FolderOpen className="w-4 h-4 mr-1" /> Categories</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Manage Categories</DialogTitle></DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>New Category</Label>
                    <Input placeholder="Category name" value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} />
                    <Textarea placeholder="Description (optional)" value={newCategoryDesc} onChange={e => setNewCategoryDesc(e.target.value)} rows={2} />
                    <Button onClick={addCategory} size="sm">Add Category</Button>
                  </div>
                  <div className="space-y-2">
                    {categories.map(c => (
                      <div key={c.id} className="flex items-center justify-between p-2 bg-secondary/30 rounded">
                        <span className="text-sm font-medium">{c.name}</span>
                        <Button variant="ghost" size="sm" onClick={() => deleteCategory(c.id)} className="text-destructive h-7 w-7 p-0">
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={tagDialogOpen} onOpenChange={setTagDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm"><Tag className="w-4 h-4 mr-1" /> Tags</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Manage Tags</DialogTitle></DialogHeader>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input placeholder="Tag name" value={newTagName} onChange={e => setNewTagName(e.target.value)} />
                    <Button onClick={addTag} size="sm">Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(t => (
                      <Badge key={t.id} variant="outline" className="gap-1 pr-1">
                        {t.name}
                        <button onClick={() => deleteTag(t.id)} className="ml-1 text-destructive hover:text-destructive/80">×</button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Posts Table */}
          <Card className="border-border/50">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden sm:table-cell">Date</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                      No posts found. Create your first post!
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map(post => (
                    <TableRow key={post.id}>
                      <TableCell>
                        <div className="font-medium text-foreground line-clamp-1">{post.title}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{post.reading_time} min read</div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {post.blog_categories ? (
                          <Badge variant="secondary" className="text-xs">{post.blog_categories.name}</Badge>
                        ) : <span className="text-muted-foreground text-xs">—</span>}
                      </TableCell>
                      <TableCell>
                        <Badge className={`text-xs ${statusColor(post.status)}`}>{post.status}</Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                        {format(new Date(post.created_at), 'MMM d, yyyy')}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => navigate(`/admin/blog/editor/${post.id}`)}>
                              <Edit className="w-4 h-4 mr-2" /> Edit
                            </DropdownMenuItem>
                            {post.status === 'published' && (
                              <DropdownMenuItem onClick={() => window.open(`/blog/${post.slug}`, '_blank')}>
                                <Eye className="w-4 h-4 mr-2" /> View
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => deletePost(post.id)} className="text-destructive">
                              <Trash2 className="w-4 h-4 mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
