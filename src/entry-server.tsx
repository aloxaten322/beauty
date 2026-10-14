import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AppRoutes } from "./App";
import { routeSeo } from "./data/seoMetadata.js";

const startMarker = '<span data-prerender-marker="start"></span>';
const endMarker = '<span data-prerender-marker="end"></span>';

export const prerenderRoutes = Object.keys(routeSeo) as Array<keyof typeof routeSeo>;

export function renderRoute(route: keyof typeof routeSeo) {
  const markup = renderToString(
    <HelmetProvider>
      <StrictMode>
        <StaticRouter location={route}>
          <span data-prerender-marker="start" />
          <AppRoutes />
          <span data-prerender-marker="end" />
        </StaticRouter>
      </StrictMode>
    </HelmetProvider>,
  );
  const startIndex = markup.indexOf(startMarker);
  const endIndex = markup.indexOf(endMarker);

  if (startIndex === -1 || endIndex <= startIndex) {
    throw new Error(`Could not isolate the prerendered page body for ${route}.`);
  }

  return markup.slice(startIndex + startMarker.length, endIndex);
}
