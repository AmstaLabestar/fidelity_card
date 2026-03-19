"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { CreditCard, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/src/i18n/navigation";
import { appendTrackingParams } from "@/src/lib/tracking";

function LoginForm() {
  const t = useTranslations("auth.login");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");
  const intent = searchParams.get("intent");

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
      setError(t("invalidCredentials"));
      setIsLoading(false);
      return;
    }

    const nextPath = intent === "preorder" ? "/dashboard?preorder=1" : "/dashboard";
    router.push(appendTrackingParams(nextPath, searchParams));
  }

  return (
    <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-200">
      <div className="card-body p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary text-primary-content p-3 rounded-2xl mb-4">
            <CreditCard size={32} />
          </div>
          <h1 className="text-3xl font-black tracking-tighter">{t("title")}</h1>
          <p className="text-base-content/60 text-center mt-2">{t("subtitle")}</p>
        </div>

        {registered && !error && (
          <div className="alert alert-success mb-6 rounded-xl text-sm py-3">
            <span>{t("registeredSuccess")}</span>
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
              <span className="label-text font-semibold">{t("email")}</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder={t("emailPlaceholder")}
              className="input input-bordered rounded-xl focus:input-primary"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">{t("password")}</span>
            </label>
            <input
              name="password"
              type="password"
              placeholder={t("passwordPlaceholder")}
              className="input input-bordered rounded-xl focus:input-primary"
              required
            />
            <label className="label">
              <span className="label-text-alt link link-hover">{t("forgot")}</span>
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full rounded-xl mt-6"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : t("submit")}
          </button>
        </form>

        <div className="divider my-8 text-xs text-base-content/40 uppercase tracking-widest">
          {t("newHere")}
        </div>

        <Link href={appendTrackingParams("/register", searchParams)} className="btn btn-outline w-full rounded-xl">
          {t("registerCta")}
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
