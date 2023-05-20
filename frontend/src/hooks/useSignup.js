import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useRouter } from "next/router";

export const useSignup = () => {
  const [error, setErro] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const router = useRouter();

  const signup = async (name, email, password) => {
    setIsLoading(true);
    setErro(null);

    const response = await fetch("http://10.20.8.112:20000/users/", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
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
