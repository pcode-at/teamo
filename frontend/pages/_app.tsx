import { AppProps } from "next/app";
import { useRouter } from "next/router";
import ProtectedRoute from "../components/atoms/ProtectedRoute";
import { globalCss } from "../stitches.config";

const globalStyles = globalCss({
  "*": {
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
  },
  body: {
    fontFamily: "comic-sans, sans-serif",
    fontWeight: "$regular",
    overflowX: "hidden",
    backgroundColor: "$background",
    minHeight: "100vh",
  },
});

function App({ Component, pageProps }: AppProps) {
  globalStyles();

  const router = useRouter();

  return (
    <ProtectedRoute router={router}>
      <Component {...pageProps} router={router} />
    </ProtectedRoute>
  );
}

export default App;
