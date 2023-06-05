import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { baseUrl } from "@/api/baseUrl";

import md5 from "md5";

import "react-toastify/dist/ReactToastify.css";

export const useUpdate = () => {
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const router = useRouter();

  const update = async (name, email, password) => {
    setIsLoading(true);

    const hashPassword = password ? md5(password) : null; // Verifica se a senha foi informada
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user ? user.token : "";
    const id = user ? user.id : "";

    const response = await fetch(`${baseUrl}/users/${id}`, {
      method: "put",
      body: JSON.stringify({
        name,
        email,
        password: hashPassword,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      toast.error(json.message);
    }

    if (response.ok) {
      const updatedUser = { ...user, name, email };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      dispatch({ type: "UPDATE", payload: json });
      setIsLoading(false);
      toast.success("Usuário alterado com sucesso!");
      router.push("home");
    }
  };

  return { update, isLoading };
};
