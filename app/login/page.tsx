"use client";
import { login } from "@/lib/api";
import { saveToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError("");
    try {
      const { access_token } = await login(data.email, data.password);
      saveToken(access_token);
      router.push("/products");
    } catch {
      setError("Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl shadow-md w-96"
      >
        <h1 className="text-xl font-bold mb-4">Iniciar Sesión</h1>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-2 p-2 border rounded"
          {...register("email", { required: "Email es obligatorio" })}
          disabled={loading}
          defaultValue={"john@mail.com"}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
        )}

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full mb-2 p-2 border rounded"
          {...register("password", { required: "Contraseña es obligatoria" })}
          disabled={loading}
          defaultValue={"changeme"}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 bg-blue-500 text-white p-2 rounded transition-colors ${
            loading
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-600 cursor-pointer"
          }`}
        >
          {loading && (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          )}
          {loading ? "Procesando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
