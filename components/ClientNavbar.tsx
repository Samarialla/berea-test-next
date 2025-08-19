"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function ClientNavbar() {
  const pathname = usePathname();

  // Mostramos Navbar salvo en login
  if (pathname.startsWith("/login")) return null;

  return <Navbar />;
}