"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CreditCard, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/src/i18n/navigation";
import { registerUser } from "@/src/modules/auth/controllers/authActions";

export default function RegisterPage() {
  const t = useTranslations("auth.register");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const intent = searchParams.get("intent");

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
      return;
    }

    const next = new URLSearchParams();
    next.set("registered", "true");
    if (intent) next.set("intent", intent);
    router.push(`/login?${next.toString()}`);
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-200">
        <div className="card-body p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-primary text-primary-content p-3 rounded-2xl mb-4">
              <CreditCard size={32} />
            </div>
            <h1 className="text-3xl font-black tracking-tighter">{t("title")}</h1>
            <p className="text-base-content/60 text-center mt-2">{t("subtitle")}</p>
          </div>

          {error && (
            <div className="alert alert-error mb-6 rounded-xl text-sm py-3">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">{t("fullName")}</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder={t("fullNamePlaceholder")}
                className="input input-bordered rounded-xl focus:input-primary"
                required
              />
            </div>

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
                minLength={6}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">{t("phone")}</span>
              </label>
              <input
                name="phone"
                type="tel"
                placeholder={t("phonePlaceholder")}
                className="input input-bordered rounded-xl focus:input-primary"
              />
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
            {t("already")}
          </div>

          <Link href="/login" className="btn btn-outline w-full rounded-xl">
            {t("loginCta")}
          </Link>
        </div>
      </div>
    </div>
  );
}

