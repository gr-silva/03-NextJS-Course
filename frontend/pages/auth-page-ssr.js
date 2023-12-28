import { withSession } from "../src/services/auth/session";

const AuthPageSSR = (props) => {
  const checkRoles = (requestedRole) => {
    const roles = props.session?.roles;
    if (roles && roles.includes(requestedRole)) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <h1>Auth Page Server Side Render</h1>
      {checkRoles("admin") ? (
        <div>
          <p>
            <a href="/logout">Logout</a>
          </p>
          <pre>{JSON.stringify(props, null, 2)}</pre>
        </div>
      ) : (
        <div>
          <p>
            <a href="/logout">Retornar para Home</a>
          </p>
          <p>Você não possui permissões para acessar esta página!</p>
        </div>
      )}
    </div>
  );
};

export default AuthPageSSR;

export const getServerSideProps = withSession((ctx) => {
  return {
    props: {
      session: ctx.req.session,
    },
  };
});
