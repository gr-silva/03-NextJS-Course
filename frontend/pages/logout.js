import { useRouter } from "next/router";
import { tokenService } from "../src/services/auth/tokenService";
import { useEffect } from "react";
import { HttpClient } from "../src/infra/HttpClient/HttpClient";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(async () => {
    try {
      await HttpClient("/api/refresh", {
        method: "DELETE",
      });
      tokenService.delete();
      router.push("/");
    } catch (error) {
      alert(error.message);
    }
  }, []);

  return <div>Você será redirecionado em instantes...</div>;
};

export default LogoutPage;
