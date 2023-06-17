import { baseUrl } from "@/api/baseUrl";

export const getOccurrences = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.token : "";
  const id = user ? user.id : "";

  const response = await fetch(`${baseUrl}/occurrences/users/${id}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await response.json();

  return json;
};
