"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";
import { getToken } from "@/lib/auth";
import { Spinner } from "./Spinner";
export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace("/login"); // reemplaza la ruta para no quedar en historial
    } else {
      setLoading(false); // token válido, dejamos renderizar contenido
    }
  }, [router]);

  if (loading) return <Spinner />;

  return <>{children}</>;
}