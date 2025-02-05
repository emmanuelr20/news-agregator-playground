import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<unknown | undefined>();
  const [token, setToken] = useState<string | undefined>("");

  const logout = () => {
    localStorage.removeItem("authData");
    router.push("/");
  };

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("authData") || "{}");

    setUser(authData?.user);
    setToken(authData?.token);

    if (!authData?.token || !authData?.user) {
      localStorage.removeItem("authData");
      router.push("/");
    }
  }, [router]);

  return { user, token, logout };
}
