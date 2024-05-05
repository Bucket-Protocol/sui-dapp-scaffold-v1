import Head from "next/head";
import { useRouter } from "next/router";
import MetaThumbnail from "/public/images/app-og-image.png";

const MetaTagsContainer = () => {
  const router = useRouter();
  //Set your product name, description, twitter account, and metadata image path
  const name = "Sui Dapp Scaffold";
  const description = "Product description";
  const twitterAccount = "@yourTwitterAccount";
  const metadataImagePath = `http://localhost:3000${MetaThumbnail.src}`;
  const pathname = router.pathname;
  const page = pathname.split("/")[1] ?? "";
  const title = `${name} ${
    page &&
    page !== "" &&
    page !== null &&
    `| ${page.slice(0, 1).toUpperCase() + page.slice(1)}`
  }`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} key="description" />
      <meta property="og:title" content={title} key="title" />
      <meta property="og:type" content="website" key="ogtype" />
      {MetaThumbnail && (
        <meta property="og:image" content={MetaThumbnail.src} key="ogimage" />
      )}

      <meta
        property="og:description"
        content={description}
        key="ogdescription"
      />
      <meta
        property="twitter:card"
        content={"summary_large_image"}
        key="twittercard"
      />
      <meta
        property="twitter:site"
        content={twitterAccount}
        key="twittersite"
      />
      <meta property="twitter:title" content={title} key="twittertitle" />
      <meta
        property="twitter:description"
        content={description}
        key="twitterdescription"
      />
      <meta
        property="twitter:image"
        content={metadataImagePath}
        key="twitterimage"
      />
      {/* Favicon */}
      <link rel="shortcut icon" type="image/png" href="/favicon.png" />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="48x48"
        href="/favicon-48x48.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/favicon-96x96.png"
      />
      <link
        rel="apple-touch-icon"
        type="image/png"
        sizes="192x192"
        href="/favicon-192x192.png"
      />
      <link
        rel="apple-touch-icon"
        type="image/png"
        sizes="167x167"
        href="/favicon-167x167.png"
      />
      <link
        rel="apple-touch-icon"
        type="image/png"
        sizes="180x180"
        href="/favicon-180x180.png"
      />
    </Head>
  );
};

export default MetaTagsContainer;
