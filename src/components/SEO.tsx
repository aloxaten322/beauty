import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description?: string;
  image?: string; // full URL
  url?: string; // full URL
}

export const SEO: React.FC<SEOProps> = ({ title, description, image, url }) => {
  React.useEffect(() => {
    document.querySelectorAll("[data-initial-seo]").forEach((element) => element.remove());
  }, []);

  const defaultDesc = description || "";
  const pageUrl = url?.trim();
  const socialImage = image?.trim();

  return (
    <Helmet>
      <title>{title}</title>
      {defaultDesc && <meta name="description" content={defaultDesc} />}
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      {defaultDesc && <meta property="og:description" content={defaultDesc} />}
      <meta property="og:type" content="website" />
      {pageUrl && <meta property="og:url" content={pageUrl} />}
      {socialImage && <meta property="og:image" content={socialImage} />}
      <meta property="og:locale" content="ru_RU" />
      {/* Twitter Card */}
      <meta name="twitter:card" content={socialImage ? "summary_large_image" : "summary"} />
      <meta name="twitter:title" content={title} />
      {defaultDesc && <meta name="twitter:description" content={defaultDesc} />}
      {socialImage && <meta name="twitter:image" content={socialImage} />}
    </Helmet>
  );
};
