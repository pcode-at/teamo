import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { globalCss } from "../stitches.config";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "../utils/skeleton.css";
import { IdProvider } from "@radix-ui/react-id";

const globalStyles = globalCss({
  "*": {
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
  },
});

import { SkeletonTheme } from "react-loading-skeleton";

function App({ Component, pageProps }: AppProps) {
  globalStyles();

  const router = useRouter();
  const queryClient = new QueryClient();

  return (
    <IdProvider>
      <SkeletonTheme
        baseColor=""
        highlightColor=""
        duration={1.3}
      >
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </SkeletonTheme>
    </IdProvider>
  );
}

export default App;
