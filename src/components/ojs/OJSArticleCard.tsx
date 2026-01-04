import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText } from "lucide-react";
import { OJSArticle, getArticleUrl, getArticlePdfUrl } from "@/services/ojsApi";
import { formatPublicationDate, formatAuthorList } from "@/lib/nigerianFormat";

interface OJSArticleCardProps {
  article: OJSArticle;
  index?: number;
}

export const OJSArticleCard = ({ article }: OJSArticleCardProps) => {
  const articleUrl = getArticleUrl(article);
  const pdfUrl = getArticlePdfUrl(article);
  
  // Strip HTML tags from abstract
  const cleanAbstract = article.abstract?.replace(/<[^>]*>/g, '') || '';
  const truncatedAbstract = cleanAbstract.length > 250 
    ? cleanAbstract.substring(0, 250) + '...' 
    : cleanAbstract;

  // Format authors
  const authorNames = article.authors?.map(a => a.fullName) || [];
  const formattedAuthors = formatAuthorList(authorNames, 3);

  return (
    <Card className="border-border/50 h-full flex flex-col hover:border-primary/30 transition-colors">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg leading-snug font-serif">
          <a 
            href={articleUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            {article.title}
          </a>
        </CardTitle>
        
        {formattedAuthors && (
          <p className="text-sm text-muted-foreground mt-2 author-name">
            {formattedAuthors}
          </p>
        )}
        
        <div className="flex flex-wrap gap-2 mt-2">
          {article.datePublished && (
            <Badge variant="secondary" className="text-xs font-normal">
              {formatPublicationDate(article.datePublished)}
            </Badge>
          )}
          {article.pages && (
            <Badge variant="outline" className="text-xs font-normal">
              pp. {article.pages}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col pt-0">
        {truncatedAbstract && (
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            {truncatedAbstract}
          </p>
        )}
        
        {article.doi && (
          <p className="text-xs text-muted-foreground mb-3 font-mono">
            DOI: <a href={`https://doi.org/${article.doi}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary">{article.doi}</a>
          </p>
        )}
        
        <div className="flex flex-wrap gap-2 mt-auto">
          <Button 
            asChild
            variant="default" 
            size="sm"
            className="flex-1 min-w-[100px]"
          >
            <a href={articleUrl} target="_blank" rel="noopener noreferrer">
              View Article
              <ExternalLink className="ml-2 w-3 h-3" />
            </a>
          </Button>
          
          {pdfUrl && (
            <Button 
              asChild
              variant="outline" 
              size="sm"
              className="flex-1 min-w-[80px]"
            >
              <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                <FileText className="mr-1 w-3 h-3" />
                PDF
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
