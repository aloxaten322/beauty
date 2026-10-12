import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description?: string;
  image?: string; // full URL
  url?: string; // full URL
}

export const SEO: React.FC<SEOProps> = ({ title, description, image, url }) => {
  const defaultDesc = description || "";
  // const siteName = masterInfo.name || "";
  const defaultUrl = url || "https://YOUR_DOMAIN_HERE";
  const defaultImage = image || "/images/og-image.jpg"; // TODO: replace with real image URL for production

  return (
    <Helmet>
      <title>{title}</title>
      {defaultDesc && <meta name="description" content={defaultDesc} />}
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      {defaultDesc && <meta property="og:description" content={defaultDesc} />}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={defaultUrl} />
      <meta property="og:image" content={defaultImage} />
      <meta property="og:locale" content="ru_RU" />
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {defaultDesc && <meta name="twitter:description" content={defaultDesc} />}
      <meta name="twitter:image" content={defaultImage} />
    </Helmet>
  );
};
