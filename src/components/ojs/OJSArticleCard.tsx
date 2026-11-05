import { FileText, LockOpen, BookOpen } from "lucide-react";
import { OJSArticle, getArticleUrl, getArticlePdfUrl } from "@/services/ojsApi";

interface OJSArticleCardProps {
  article: OJSArticle;
  index?: number;
}

const MAX_AUTHORS = 5;

/** ScienceDirect-style article row: meta line, serif title, truncated authors, inline text actions. */
export const OJSArticleCard = ({ article, index = 0 }: OJSArticleCardProps) => {
  const articleUrl = getArticleUrl(article);
  const pdfUrl = getArticlePdfUrl(article);
  const rawAuthors = article.authors?.map((author) => author.fullName) ?? [];
  // OJS sometimes returns the whole byline as one string ("Surname, I.N., Surname, I.N."); split it into names.
  const authors =
    rawAuthors.length === 1 ? rawAuthors[0].split(/(?<=\.),\s*/).map((name) => name.trim()).filter(Boolean) : rawAuthors;
  const authorLine =
    authors.length > MAX_AUTHORS ? `${authors.slice(0, MAX_AUTHORS).join(", ")} et al.` : authors.join(", ");

  return (
    <article className="py-5 first:pt-0" data-order={index + 1}>
      <div className="meta-text mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="oa-label">
          <LockOpen className="h-3.5 w-3.5" aria-hidden /> Open access
        </span>
        {article.pages && <span>Pages {article.pages}</span>}
        {article.datePublished && (
          <span>
            {new Date(article.datePublished).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
          </span>
        )}
      </div>
      <h3 className="line-clamp-2 font-serif text-xl font-semibold leading-snug text-primary sm:text-[22px] dark:text-foreground">
        <a href={articleUrl} target="_blank" rel="noopener noreferrer" className="transition-colors duration-150 hover:text-accent">
          {article.title}
        </a>
      </h3>
      {authorLine && (
        <p className="mt-2 text-[15px] text-muted-foreground" title={authors.length > MAX_AUTHORS ? authors.join(", ") : undefined}>
          {authorLine}
        </p>
      )}
      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm font-medium text-accent">
        <a href={articleUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-1.5 hover:underline sm:min-h-0">
          <BookOpen className="h-3.5 w-3.5" aria-hidden /> Abstract
        </a>
        {pdfUrl && (
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-1.5 hover:underline sm:min-h-0">
            <FileText className="h-3.5 w-3.5" aria-hidden /> PDF
          </a>
        )}
        {article.doi && <span className="font-normal text-muted-foreground">DOI: {article.doi}</span>}
      </div>
    </article>
  );
};
