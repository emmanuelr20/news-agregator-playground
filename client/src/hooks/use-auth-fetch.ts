import React, { useContext } from "react";
import { API_URL } from "@/lib/config";
import { AuthContext } from "@/components/layout/main-layout";

export default function useAuthFetch() {
  const { token } = useContext(AuthContext);

  const fetchData = async (
    path: string,
    method: string = "GET",
    body: unknown = {}
  ) => {
    const response = await fetch(`${API_URL}/${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      ...(method.toUpperCase() === "GET" ? {} : { body: JSON.stringify(body) }),
    });

    const data = await response.json();

    return data;
  };
  return { fetchData, token };
}
