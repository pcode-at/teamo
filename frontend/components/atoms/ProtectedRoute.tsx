import { useEffect } from "react";
import { getAccessToken } from "../../utils/authHelper";
import { appRoutes } from "../../utils/routes";

//check if you are on the client (browser) or server
const isBrowser = () => typeof window !== "undefined";

const ProtectedRoute = ({ router, children }) => {
  useEffect(() => {
    checkIfUserIsLoggedIn();

    async function checkIfUserIsLoggedIn() {
      //   Identify authenticated user
      const accessToken = await getAccessToken();

      let unprotectedRoutes = [
        appRoutes.LOGIN,
      ];

      /**
       * @var pathIsProtected Checks if path exists in the unprotectedRoutes routes array
       */
      let pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;

      if (isBrowser() && !accessToken && pathIsProtected) {
        router.push(appRoutes.LOGIN);
      }
    }
  }, [router]);

  return children;
};

export default ProtectedRoute;