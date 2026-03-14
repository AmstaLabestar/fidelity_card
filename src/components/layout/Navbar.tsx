"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { CreditCard, LogOut, User, LayoutDashboard, ShieldCheck } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.email === "amsta405@gmail.com";

  return (
    <div className="navbar bg-base-100/80 backdrop-blur-md border-b border-base-200 sticky top-0 z-50 px-4 lg:px-8">
      <div className="flex-1">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary text-primary-content p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
            <CreditCard size={20} />
          </div>
          <span className="text-xl font-black tracking-tighter">SmartCard</span>
        </Link>
      </div>
      <div className="flex-none gap-4">
        {session ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border border-base-200">
              <div className="w-10 rounded-full flex items-center justify-center bg-base-200">
                <User size={20} className="mx-auto mt-2" />
              </div>
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow-2xl menu menu-sm dropdown-content bg-base-100 rounded-2xl w-52 border border-base-200">
              <li className="menu-title px-4 py-2 opacity-50 text-xs uppercase tracking-widest">Account</li>
              <li>
                <Link href="/dashboard" className="py-3 gap-3">
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>
              </li>
              {isAdmin && (
                <li>
                  <Link href="/admin" className="py-3 gap-3 text-primary font-bold">
                    <ShieldCheck size={16} />
                    Admin Panel
                  </Link>
                </li>
              )}
              <div className="divider my-1"></div>
              <li>
                <button onClick={() => signOut()} className="py-3 gap-3 text-error">
                  <LogOut size={16} />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/login" className="btn btn-ghost btn-sm rounded-full px-6">Login</Link>
            <Link href="/register" className="btn btn-primary btn-sm rounded-full px-6 shadow-lg shadow-primary/20">Get Started</Link>
          </div>
        )}
      </div>
    </div>
  );
}

