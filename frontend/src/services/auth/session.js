import { authService } from "./authService";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export const withSession = (_function) => {
  return async (ctx) => {
    try {
      const session = await authService.getSession(ctx);
      const modifiedCtx = {
        ...ctx,
        req: {
          ...ctx.req,
          session,
        },
      };

      return _function(modifiedCtx);
    } catch (error) {
      console.log(error);
      return {
        redirect: {
          permanent: false,
          destination: "/?error=401",
        },
      };
    }
  };
};

export const useSession = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    authService
      .getSession()
      .then((userSession) => {
        setSession(userSession);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    data: { session },
    error,
    loading,
  };
};

export const withSessionHOC = (Component) => {
  return function Wrapper(props) {
    const router = useRouter();
    const session = useSession();

    if (!session.loading && session.error) {
      console.log("Redirecionar usuário para home");
      router.push("/?error=401");
    }

    const modifiedProps = {
      ...props,
      session: session.data.session,
    };

    return <Component {...modifiedProps} />;
  };
};
