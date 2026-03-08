import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import { useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, Code, Minus,
  Link as LinkIcon, ImageIcon, Undo, Redo,
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ content, onChange, placeholder = 'Start writing your article...' }: RichTextEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'text-primary underline cursor-pointer' },
      }),
      Image.configure({
        HTMLAttributes: { class: 'rounded-lg max-w-full h-auto my-4' },
      }),
      Placeholder.configure({ placeholder }),
      Underline,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none min-h-[400px] p-6 focus:outline-none',
      },
    },
  });

  const addLink = useCallback(() => {
    if (!editor) return;
    const url = window.prompt('Enter URL:');
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  }, [editor]);

  const addImage = useCallback(async (file: File) => {
    if (!editor) return;
    const ext = file.name.split('.').pop();
    const path = `posts/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    
    const { error } = await supabase.storage.from('blog-images').upload(path, file);
    if (error) {
      toast.error('Failed to upload image');
      return;
    }
    const { data: urlData } = supabase.storage.from('blog-images').getPublicUrl(path);
    editor.chain().focus().setImage({ src: urlData.publicUrl, alt: file.name }).run();
    toast.success('Image uploaded');
  }, [editor]);

  const handleImageClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) addImage(file);
    e.target.value = '';
  };

  if (!editor) return null;

  const ToolBtn = ({ onClick, active, children, title }: { onClick: () => void; active?: boolean; children: React.ReactNode; title: string }) => (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onClick}
      title={title}
      className={`h-8 w-8 p-0 ${active ? 'bg-primary/15 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
    >
      {children}
    </Button>
  );

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-background">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-border bg-secondary/30">
        <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold">
          <Bold className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic">
          <Italic className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline">
          <UnderlineIcon className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Strikethrough">
          <Strikethrough className="w-4 h-4" />
        </ToolBtn>
        
        <Separator orientation="vertical" className="h-6 mx-1" />
        
        <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} title="Heading 1">
          <Heading1 className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Heading 2">
          <Heading2 className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Heading 3">
          <Heading3 className="w-4 h-4" />
        </ToolBtn>
        
        <Separator orientation="vertical" className="h-6 mx-1" />
        
        <ToolBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet List">
          <List className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Ordered List">
          <ListOrdered className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Blockquote">
          <Quote className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} title="Code Block">
          <Code className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal Rule">
          <Minus className="w-4 h-4" />
        </ToolBtn>
        
        <Separator orientation="vertical" className="h-6 mx-1" />
        
        <ToolBtn onClick={addLink} active={editor.isActive('link')} title="Insert Link">
          <LinkIcon className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={handleImageClick} title="Insert Image">
          <ImageIcon className="w-4 h-4" />
        </ToolBtn>
        
        <Separator orientation="vertical" className="h-6 mx-1" />
        
        <ToolBtn onClick={() => editor.chain().focus().undo().run()} title="Undo">
          <Undo className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().redo().run()} title="Redo">
          <Redo className="w-4 h-4" />
        </ToolBtn>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />

      {/* Hidden file input for image upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <style>{`
        .tiptap p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: hsl(var(--muted-foreground));
          pointer-events: none;
          height: 0;
        }
        .tiptap h1 { font-size: 2em; font-weight: 700; margin: 1em 0 0.5em; font-family: 'Lora', serif; }
        .tiptap h2 { font-size: 1.5em; font-weight: 600; margin: 0.8em 0 0.4em; font-family: 'Lora', serif; }
        .tiptap h3 { font-size: 1.25em; font-weight: 600; margin: 0.6em 0 0.3em; font-family: 'Lora', serif; }
        .tiptap p { margin: 0.5em 0; line-height: 1.8; }
        .tiptap ul, .tiptap ol { padding-left: 1.5em; margin: 0.5em 0; }
        .tiptap li { margin: 0.25em 0; }
        .tiptap blockquote { border-left: 3px solid hsl(var(--primary)); padding-left: 1em; margin: 1em 0; color: hsl(var(--muted-foreground)); font-style: italic; }
        .tiptap pre { background: hsl(var(--secondary)); padding: 1em; border-radius: 0.5em; overflow-x: auto; margin: 1em 0; }
        .tiptap code { background: hsl(var(--secondary)); padding: 0.2em 0.4em; border-radius: 0.25em; font-size: 0.9em; }
        .tiptap hr { border-color: hsl(var(--border)); margin: 1.5em 0; }
        .tiptap a { color: hsl(var(--primary)); text-decoration: underline; }
        .tiptap img { max-width: 100%; height: auto; border-radius: 0.5em; margin: 1em 0; }
      `}</style>
    </div>
  );
}
