import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { baseUrl } from "@/api/baseUrl";
import "react-toastify/dist/ReactToastify.css";

export const useDelete = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const router = useRouter();

  const deleteUser = async () => {
    setIsLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user ? user.token : "";
    const id = user ? user.id : "";

    const response = await fetch(`${baseUrl}/users/${id}`, {
      method: "delete",
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
      localStorage.removeItem("user");
      dispatch({ type: "DELETE" });
      toast.success(json.message);
      router.push("/login");
    }
  };

  return { deleteUser, isLoading };
};
