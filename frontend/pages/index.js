import { useState } from "react";
import { useRouter } from "next/router";
import { authService } from "../src/services/auth/authService";
import Link from "next/link";

export default function HomeScreen() {
  const router = useRouter();
  const [values, setValues] = useState({
    usuario: "omariosouto",
    senha: "safepassword",
  });

  const handleChange = (event) => {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;
    setValues((currentValues) => {
      return { ...currentValues, [fieldName]: fieldValue };
    });
  };

  return (
    <div>
      <h1>Login</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          authService
            .login({
              username: values.usuario,
              password: values.senha,
            })
            .then(() => {
              // router.push("/auth-page-static");
              router.push("/auth-page-ssr");
            })
            .catch(() => {
              alert("Usuário ou senha estão inválidos");
            });
        }}
      >
        <input
          placeholder="Usuário"
          name="usuario"
          value={values.usuario}
          onChange={handleChange}
        />
        <input
          placeholder="Senha"
          name="senha"
          type="password"
          value={values.senha}
          onChange={handleChange}
        />
        <div>
          <button>Entrar</button>
        </div>
        <div>
          <Link href="/auth-page-static">Static Page</Link> |{" "}
          <Link href="/auth-page-ssr">Server Side Page</Link>
        </div>
      </form>
    </div>
  );
}
