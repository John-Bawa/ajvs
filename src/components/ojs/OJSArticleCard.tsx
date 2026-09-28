import { ExternalLink, FileText } from "lucide-react";
import { OJSArticle, getArticleUrl, getArticlePdfUrl } from "@/services/ojsApi";

interface OJSArticleCardProps {
  article: OJSArticle;
  index?: number;
}

export const OJSArticleCard = ({ article, index = 0 }: OJSArticleCardProps) => {
  const articleUrl = getArticleUrl(article);
  const pdfUrl = getArticlePdfUrl(article);
  
  return (
    <article className="py-5 first:pt-0" data-order={index + 1}>
      <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase text-muted-foreground">
        <span className="text-primary">Open Access</span>
        {article.pages && <span>Pages {article.pages}</span>}
        {article.datePublished && (
          <span>{new Date(article.datePublished).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
        )}
      </div>
      <h3 className="text-lg font-semibold leading-snug sm:text-xl">
        <a href={articleUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
          {article.title}
        </a>
      </h3>
      {article.authors && article.authors.length > 0 && (
        <p className="mt-2 text-sm text-muted-foreground">{article.authors.map((author) => author.fullName).join(', ')}</p>
      )}
      <div className="mt-3 flex flex-wrap items-center gap-4 text-sm font-semibold text-primary">
        <a href={articleUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline">
          Article <ExternalLink className="h-3.5 w-3.5" />
        </a>
        {pdfUrl && (
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline">
            <FileText className="h-3.5 w-3.5" /> PDF
          </a>
        )}
        {article.doi && <span className="font-normal text-muted-foreground">DOI: {article.doi}</span>}
      </div>
    </article>
  );
};
