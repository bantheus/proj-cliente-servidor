import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useRouter } from "next/router";
import md5 from "md5";

export const useSignup = () => {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const router = useRouter();

  const signup = async (name, email, password) => {
    setIsLoading(true);
    setMessage(null);

    const hashPassword = md5(password);

    const response = await fetch("http://localhost:20000/users/", {
      method: "post",
      body: JSON.stringify({ name, email, password: hashPassword }),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setMessage(json.message);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      router.push("login");
    }
  };

  return { signup, isLoading, message };
};
