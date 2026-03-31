import { Helmet } from "react-helmet-async";

export const Seo = ({ title, description, keywords, urlPath = "/" }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content="/sklogo.jpeg" />
    <meta property="og:url" content={`${window.location.origin}${urlPath}`} />
  </Helmet>
);
