import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonProps } from "@/components/ui/button";

interface OJSExternalLinkProps extends ButtonProps {
  href: string;
  children: React.ReactNode;
  showIcon?: boolean;
}

export const OJSExternalLink = ({ 
  href, 
  children, 
  showIcon = true,
  ...props 
}: OJSExternalLinkProps) => {
  const handleClick = () => {
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <Button
      onClick={handleClick}
      {...props}
    >
      {children}
      {showIcon && <ExternalLink className="w-4 h-4 ml-2" />}
    </Button>
  );
};
