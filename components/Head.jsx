import Head from 'next/head';
import seo from '../data/seo.json';
import user from '../data/user.json';

const CustomHead = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content={seo.description}
      />
      <meta
        name="keywords"
        content={seo.keywords.join(', ')}
      />

      <meta property="og:title" content={seo.title} />
      <meta
        property="og:description"
        content={seo.description}
      />
      <meta property="og:image" content={seo.ogImage} />
      <meta property="og:url" content={seo.siteUrl} />

    </Head>
  );
};

export default CustomHead;

CustomHead.defaultProps = {
  title: seo.title,
};
