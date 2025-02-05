import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useGuest() {
  const router = useRouter();

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("authData") || "{}");

    if (authData?.token && authData?.user) {
      router.push("/news");
    }
  }, [router]);
}
