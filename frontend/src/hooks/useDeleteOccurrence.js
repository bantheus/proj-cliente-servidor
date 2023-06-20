import { useState } from "react";
import { toast } from "react-toastify";
import { baseUrl } from "@/api/baseUrl";
import "react-toastify/dist/ReactToastify.css";

export const useDeleteOccurrence = () => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteOccurrence = async (id) => {
    setIsLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user ? user.token : "";

    const response = await fetch(`${baseUrl}/occurrences/${id}`, {
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
      toast.success(json.message);
    }
  };

  return { deleteOccurrence, isLoading };
};
