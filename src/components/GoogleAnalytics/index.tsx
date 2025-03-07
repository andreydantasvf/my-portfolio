import Script from 'next/script';

export const GoogleAnalytics = () => {
  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING}`}
      />

      <Script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING}', {
                page_path: window.location.pathname,
              });
          `
        }}
      />
    </>
  );
};
