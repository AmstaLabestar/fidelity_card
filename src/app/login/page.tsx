"use client";

import { useState, useEffect, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CreditCard, Loader2 } from "lucide-react";

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setIsLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-200">
      <div className="card-body p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary text-primary-content p-3 rounded-2xl mb-4">
            <CreditCard size={32} />
          </div>
          <h1 className="text-3xl font-black tracking-tighter">Welcome Back</h1>
          <p className="text-base-content/60 text-center mt-2">
            Login to manage your SmartCard and pre-orders.
          </p>
        </div>

        {registered && !error && (
          <div className="alert alert-success mb-6 rounded-xl text-sm py-3">
            <span>Registration successful! Please login.</span>
          </div>
        )}

        {error && (
          <div className="alert alert-error mb-6 rounded-xl text-sm py-3">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Email Address</span>
            </label>
            <input 
              name="email"
              type="email" 
              placeholder="john@example.com" 
              className="input input-bordered rounded-xl focus:input-primary" 
              required 
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Password</span>
            </label>
            <input 
              name="password"
              type="password" 
              placeholder="••••••••" 
              className="input input-bordered rounded-xl focus:input-primary" 
              required 
            />
            <label className="label">
              <span className="label-text-alt link link-hover">Forgot password?</span>
            </label>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-full rounded-xl mt-6"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Login"}
          </button>
        </form>

        <div className="divider my-8 text-xs text-base-content/40 uppercase tracking-widest">New to SmartCard?</div>

        <Link href="/register" className="btn btn-outline w-full rounded-xl">
          Create an Account
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <Suspense fallback={<Loader2 className="animate-spin text-primary" size={48} />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
