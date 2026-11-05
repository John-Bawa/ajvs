import { ReactNode, useEffect, useRef, useState } from "react";

interface TocItem {
  id: string;
  text: string;
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/**
 * Shared long-form layout: a 720px reading column with a sticky "On this page" list on desktop.
 * Builds the list from the column's H2 headings so pages keep their own markup.
 */
export function ReadingLayout({ children }: { children: ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;
    const headings = Array.from(root.querySelectorAll("h2"));
    const used = new Set<string>();
    const next = headings.map((h) => {
      let id = h.id || slugify(h.textContent || "section");
      while (used.has(id)) id = `${id}-2`;
      used.add(id);
      h.id = id;
      return { id, text: (h.textContent || "").trim() };
    });
    setItems(next);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px" },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  const showToc = items.length > 1;

  return (
    <div className="container mx-auto px-4 sm:px-6">
      <div className={showToc ? "lg:grid lg:grid-cols-[minmax(0,720px)_220px] lg:justify-between lg:gap-16" : ""}>
        <div ref={contentRef} className="reading-layout mx-auto w-full max-w-[720px] lg:mx-0">
          {children}
        </div>
        {showToc && (
          <aside className="hidden lg:block" aria-label="On this page">
            <nav className="sticky top-24 border-l border-border pl-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">On this page</p>
              <ul className="space-y-1 text-sm">
                {items.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={activeId === item.id ? "location" : undefined}
                      className={`-ml-[17px] block border-l-2 py-1 pl-4 leading-snug transition-colors duration-150 hover:text-accent ${
                        activeId === item.id ? "border-accent font-medium text-foreground" : "border-transparent text-muted-foreground"
                      }`}
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}
      </div>
    </div>
  );
}
