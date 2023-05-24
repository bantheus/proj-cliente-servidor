import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { baseUrl } from "@/api/baseUrl";
import md5 from "md5";
import "react-toastify/dist/ReactToastify.css";

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const router = useRouter();

  const signup = async (name, email, password) => {
    setIsLoading(true);

    if (!name || !email || !password) {
      setIsLoading(false);
      toast.error("Todos os campos devem ser preenchidos!");
      return;
    }

    if (password.length < 2) {
      setIsLoading(false);
      toast.error("A senha deve ter pelo menos 2 dígitos!");
      return;
    }

    const hashPassword = md5(password);

    const response = await fetch(`${baseUrl}/users`, {
      method: "post",
      body: JSON.stringify({ name, email, password: hashPassword }),
      headers: { "Content-Type": "application/json" },
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      toast.error(json.message);
      return;
    }

    localStorage.setItem("user", JSON.stringify(json));

    dispatch({ type: "LOGIN", payload: json });
    setIsLoading(false);
    toast.success("Usuário cadastrado com sucesso!");
    router.push("login");
  };

  return { signup, isLoading };
};
