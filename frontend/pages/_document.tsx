import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { getCssText } from "../stitches.config";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />
          <style
            dangerouslySetInnerHTML={{
              __html: `
/* poppins-regular - latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local(''),
       url('/fonts/poppins-v15-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
       url('/fonts/poppins-v15-latin-regular.woff') format('woff'), /* Modern Browsers */
       url('/fonts/poppins-v15-latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
       url('/fonts/poppins-v15-latin-regular.svg#Poppins') format('svg'); /* Legacy iOS */
}
/* poppins-500 - latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: local(''),
       url('/fonts/poppins-v15-latin-500.woff2') format('woff2'), /* Super Modern Browsers */
       url('/fonts/poppins-v15-latin-500.woff') format('woff'), /* Modern Browsers */
       url('/fonts/poppins-v15-latin-500.ttf') format('truetype'), /* Safari, Android, iOS */
       url('/fonts/poppins-v15-latin-500.svg#Poppins') format('svg'); /* Legacy iOS */
}
/* poppins-700 - latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: local(''),
       url('/fonts/poppins-v15-latin-700.woff2') format('woff2'), /* Super Modern Browsers */
       url('/fonts/poppins-v15-latin-700.woff') format('woff'), /* Modern Browsers */
       url('/fonts/poppins-v15-latin-700.ttf') format('truetype'), /* Safari, Android, iOS */
       url('/fonts/poppins-v15-latin-700.svg#Poppins') format('svg'); /* Legacy iOS */
}
/* poppins-800 - latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: local(''),
       url('/fonts/poppins-v15-latin-800.woff2') format('woff2'), /* Super Modern Browsers */
       url('/fonts/poppins-v15-latin-800.woff') format('woff'), /* Modern Browsers */
       url('/fonts/poppins-v15-latin-800.ttf') format('truetype'), /* Safari, Android, iOS */
       url('/fonts/poppins-v15-latin-800.svg#Poppins') format('svg'); /* Legacy iOS */
}
/* poppins-900 - latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: local(''),
       url('/fonts/poppins-v15-latin-900.woff2') format('woff2'), /* Super Modern Browsers */
       url('/fonts/poppins-v15-latin-900.woff') format('woff'), /* Modern Browsers */
       url('/fonts/poppins-v15-latin-900.ttf') format('truetype'), /* Safari, Android, iOS */
       url('/fonts/poppins-v15-latin-900.svg#Poppins') format('svg'); /* Legacy iOS */
}
* {
  font-family: 'Poppins', sans-serif;
}

#__next{
  min-height: 100vh;
  position: relative;
}
}
`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
