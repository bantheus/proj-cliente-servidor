import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { baseUrl } from "@/api/baseUrl";
import "react-toastify/dist/ReactToastify.css";

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const router = useRouter();

  const logout = async () => {
    setIsLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user ? user.token : "";
    const id = user ? user.id : "";

    const response = await fetch(`${baseUrl}/logout`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      setIsLoading(false);
      const json = await response.json();
      toast.error(json.message);
    }

    if (response.ok) {
      localStorage.removeItem("user");
      dispatch({ type: "LOGOUT" });
      toast.success("Usuário deslogado com sucesso!");
      router.push("/login");
    }
  };

  return { logout, isLoading };
};
