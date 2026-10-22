import { Helmet } from "react-helmet-async";

type HeadProps = { title?: string; description?: string };

export function Head({ title, description }: HeadProps) {
  return (
    <Helmet>
      <title>{title ? `${title} | Clientele` : "Clientele"}</title>
      {description && <meta name="description" content={description} />}
    </Helmet>
  );
}
