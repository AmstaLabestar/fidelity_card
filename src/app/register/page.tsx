"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/src/modules/auth/controllers/authActions";
import Link from "next/link";
import { CreditCard, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as any;

    const result = await registerUser(data);

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
    } else {
      router.push("/login?registered=true");
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-200">
        <div className="card-body p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-primary text-primary-content p-3 rounded-2xl mb-4">
              <CreditCard size={32} />
            </div>
            <h1 className="text-3xl font-black tracking-tighter">Create Account</h1>
            <p className="text-base-content/60 text-center mt-2">
              Join the SmartCard network and start saving today.
            </p>
          </div>

          {error && (
            <div className="alert alert-error mb-6 rounded-xl text-sm py-3">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Full Name</span>
              </label>
              <input 
                name="name"
                type="text" 
                placeholder="John Doe" 
                className="input input-bordered rounded-xl focus:input-primary" 
                required 
              />
            </div>

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
                minLength={6}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Phone Number (Optional)</span>
              </label>
              <input 
                name="phone"
                type="tel" 
                placeholder="+1 234 567 890" 
                className="input input-bordered rounded-xl focus:input-primary" 
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-full rounded-xl mt-6"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Create Account"}
            </button>
          </form>

          <div className="divider my-8 text-xs text-base-content/40 uppercase tracking-widest">Already have an account?</div>

          <Link href="/login" className="btn btn-outline w-full rounded-xl">
            Login to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
