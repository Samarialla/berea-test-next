"use client";

import { logout } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LuLogOut } from "react-icons/lu";

export default function Navbar() {
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-stone-900 text-white p-4 flex justify-between items-center shadow-md z-50">
      <Link href="/products" className="font-bold text-lg">
        Fake Store
      </Link>
      <div className="flex gap-4 ">
        <button
          onClick={handleLogout}
          className="px-3 py-1 flex border border-gray-400 rounded hover:bg-blue-600 w-max cursor-pointer"
        >
        <LuLogOut className="mt-1 mr-1"/>  Cerrar sesión
        </button>
      </div>
    </nav>
  );
}
