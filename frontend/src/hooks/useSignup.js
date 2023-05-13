import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useRouter } from "next/router";

export const useSignup = () => {
  const [error, setErro] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const router = useRouter();

  const signup = async (nome, email, senha) => {
    setIsLoading(true);
    setErro(null);

    const response = await fetch("http://localhost:20000/users/", {
      method: "post",
      body: JSON.stringify({ nome, email, senha }),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setErro(json.error);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      router.push("login");
    }
  };

  return { signup, isLoading, error };
};
