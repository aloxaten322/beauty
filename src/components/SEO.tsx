import React from "react";
import { Helmet } from "react-helmet-async";
import { getSeoMetadata, type SeoRoute } from "../data/seoMetadata";

interface SEOProps {
  route: SeoRoute;
}

export const SEO: React.FC<SEOProps> = ({ route }) => {
  React.useEffect(() => {
    document.querySelectorAll("[data-initial-seo]").forEach((element) => element.remove());
  }, []);

  const { title, description, url, image, imageAlt, twitterCard = "summary" } =
    getSeoMetadata(route);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {url && <link rel="canonical" href={url} />}
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}
      {imageAlt && <meta property="og:image:alt" content={imageAlt} />}
      <meta property="og:locale" content="ru_RU" />
      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
};
