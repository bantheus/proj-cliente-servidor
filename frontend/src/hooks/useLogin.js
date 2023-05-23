import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import md5 from "md5";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const router = useRouter();

  const login = async (email, password) => {
    setIsLoading(true);

    const hashPassword = md5(password);

    const response = await fetch("http://localhost:20000/users/login", {
      method: "post",
      body: JSON.stringify({ email, password: hashPassword }),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      toast.error(json.message);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      toast.success("Usuário Logado com sucesso!");
      router.push("home");
    }
  };

  return { login, isLoading };
};
