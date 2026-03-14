import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { redirect } from "next/navigation";
import { AdminService } from "@/src/services/AdminService";
import { Users, ShoppingBag, CreditCard, DollarSign, ArrowLeft } from "lucide-react";
import Link from "next/link";

const ADMIN_EMAIL = "amsta405@gmail.com";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.email !== ADMIN_EMAIL) {
    redirect("/dashboard");
  }

  const adminService = new AdminService();
  const stats = await adminService.getGlobalStats();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col gap-10">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/dashboard" className="btn btn-ghost btn-sm gap-2 mb-4">
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>
            <h1 className="text-4xl font-black tracking-tighter">Admin Control Center</h1>
            <p className="text-base-content/60">Real-time platform performance and growth metrics.</p>
          </div>
          <div className="badge badge-primary badge-lg font-bold py-4 px-6">ADMIN MODE</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card bg-base-100 shadow-xl border border-base-200">
            <div className="card-body">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs uppercase tracking-widest font-bold opacity-50">Total Users</h2>
                <Users className="text-primary" size={20} />
              </div>
              <p className="text-4xl font-black">{stats.totalUsers}</p>
              <p className="text-xs text-success font-bold mt-2">+100% growth</p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border border-base-200">
            <div className="card-body">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs uppercase tracking-widest font-bold opacity-50">Total Orders</h2>
                <ShoppingBag className="text-primary" size={20} />
              </div>
              <p className="text-4xl font-black">{stats.totalOrders}</p>
              <p className="text-xs text-success font-bold mt-2">Active reservations</p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border border-base-200">
            <div className="card-body">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs uppercase tracking-widest font-bold opacity-50">Cards Reserved</h2>
                <CreditCard className="text-primary" size={20} />
              </div>
              <p className="text-4xl font-black">{stats.totalCards}</p>
              <p className="text-xs text-info font-bold mt-2">Founder's Edition</p>
            </div>
          </div>

          <div className="card bg-neutral text-neutral-content shadow-xl">
            <div className="card-body">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs uppercase tracking-widest font-bold opacity-50">Est. Revenue</h2>
                <DollarSign className="text-primary" size={20} />
              </div>
              <p className="text-4xl font-black">${stats.revenue.toLocaleString()}</p>
              <p className="text-xs opacity-50 mt-2">Based on $29/card</p>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden">
          <div className="p-6 border-b border-base-200 bg-base-200/30">
            <h3 className="font-bold text-xl">Platform Health</h3>
          </div>
          <div className="p-12 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center gap-2">
                <div className="radial-progress text-primary" style={{"--value": 100, "--size": "8rem"} as any} role="progressbar">100%</div>
                <p className="font-bold mt-4">Database Uptime</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="radial-progress text-success" style={{"--value": 98, "--size": "8rem"} as any} role="progressbar">98%</div>
                <p className="font-bold mt-4">Auth Success Rate</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="radial-progress text-info" style={{"--value": 85, "--size": "8rem"} as any} role="progressbar">85%</div>
                <p className="font-bold mt-4">Conversion Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
