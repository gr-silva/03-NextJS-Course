import { withSessionHOC } from "../src/services/auth/session";

const AuthPageStatic = (props) => {
  const checkRoles = (requestedRole) => {
    const roles = props.session?.roles;
    if (roles && roles.includes(requestedRole)) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <h1>Auth Page Static</h1>
      {checkRoles("user") ? (
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

export default withSessionHOC(AuthPageStatic);
