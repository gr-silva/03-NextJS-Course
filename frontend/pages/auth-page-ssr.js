import { tokenService } from "../src/services/auth/tokenService";
import nookies from "nookies";

const AuthPageSSR = (props) => {
  return (
    <div>
      <h1>Auth Page SSR</h1>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
};

export default AuthPageSSR;

export const getServerSideProps = (ctx) => {
  const cookies = nookies.get(ctx);

  return {
    props: {
      token: tokenService.get(ctx),
    },
  };
};
