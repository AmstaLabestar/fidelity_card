"use client";

import { useState } from "react";
import { CreditCard, Package, TrendingUp, Clock, Plus } from "lucide-react";
import PreorderModal from "@/src/components/dashboard/PreorderModal";
import { motion } from "motion/react";

interface DashboardContentProps {
  userName: string;
  preorders: any[];
}

export default function DashboardContent({ userName, preorders }: DashboardContentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalCards = preorders.reduce((acc, curr) => acc + curr.quantity, 0);
  const hasPreorder = preorders.length > 0;

  return (
    <div className="container mx-auto px-4 py-12">
      <PreorderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="flex flex-col gap-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl lg:text-5xl font-black tracking-tighter mb-2">Welcome, {userName}</h1>
            <p className="text-base-content/60 text-lg">Manage your SmartCard and track your pre-orders here.</p>
          </motion.div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary rounded-full px-8 shadow-lg shadow-primary/20 group"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform" />
            New Pre-order
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden group">
            <div className="card-body relative">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Package size={80} />
              </div>
              <h2 className="card-title text-base-content/50 text-xs uppercase tracking-widest font-bold">Active Pre-orders</h2>
              <p className="text-5xl font-black mt-2">{totalCards}</p>
              <div className="mt-4 flex items-center gap-2 text-xs font-bold text-success">
                <TrendingUp size={14} />
                <span>Founder's Edition Status</span>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden group">
            <div className="card-body relative">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <TrendingUp size={80} />
              </div>
              <h2 className="card-title text-base-content/50 text-xs uppercase tracking-widest font-bold">Total Savings</h2>
              <p className="text-5xl font-black mt-2">$0.00</p>
              <p className="text-xs opacity-50 mt-4 italic">Savings will appear after card activation.</p>
            </div>
          </div>

          <div className="card bg-primary text-primary-content shadow-xl shadow-primary/20 overflow-hidden relative">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <div className="card-body">
              <h2 className="card-title text-primary-content/70 text-xs uppercase tracking-widest font-bold">Card Status</h2>
              <div className={`badge ${hasPreorder ? 'badge-success' : 'badge-warning'} badge-lg font-black py-4 px-6 mt-2`}>
                {hasPreorder ? 'RESERVED' : 'NOT ORDERED'}
              </div>
              <p className="text-sm opacity-80 mt-4">
                {hasPreorder 
                  ? 'Your card is being prepared for the first batch.' 
                  : 'Pre-order your card to start saving up to 50%.'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 card bg-base-100 shadow-xl border border-base-200 overflow-hidden">
            <div className="p-6 border-b border-base-200 flex justify-between items-center bg-base-200/30">
              <h3 className="font-bold text-xl flex items-center gap-2">
                <Clock size={20} className="text-primary" />
                Order History
              </h3>
            </div>
            <div className="p-0">
              {preorders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead>
                      <tr className="bg-base-200/50">
                        <th>Order ID</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {preorders.map((order) => (
                        <tr key={order.id} className="hover:bg-base-200/30 transition-colors">
                          <td className="font-mono text-xs opacity-60">{order.id}</td>
                          <td className="font-bold">{order.quantity} Card(s)</td>
                          <td>
                            <span className={`badge badge-sm font-bold ${
                              order.status === 'pending' ? 'badge-warning' : 
                              order.status === 'confirmed' ? 'badge-success' : 'badge-info'
                            }`}>
                              {order.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="text-sm opacity-60">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-20 text-center flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center text-base-content/20">
                    <Package size={32} />
                  </div>
                  <div className="max-w-xs">
                    <p className="font-bold text-lg">No orders yet</p>
                    <p className="text-sm text-base-content/50">Your pre-orders will appear here once you make your first reservation.</p>
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="btn btn-primary btn-sm rounded-full px-6 mt-2"
                  >
                    Place First Order
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="card bg-neutral text-neutral-content shadow-xl overflow-hidden relative">
            <div className="absolute bottom-0 right-0 opacity-10">
               <CreditCard size={200} />
            </div>
            <div className="card-body">
              <h3 className="text-2xl font-black tracking-tighter mb-4">Founder's Perks</h3>
              <ul className="space-y-4 text-sm opacity-80">
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></div>
                  <span>Lifetime access to the SmartCard network with no monthly fees.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></div>
                  <span>Exclusive physical card design only for early adopters.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></div>
                  <span>Priority access to new merchant partnerships and features.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></div>
                  <span>Double reward points on all purchases for the first 6 months.</span>
                </li>
              </ul>
              <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-xs font-bold uppercase tracking-widest opacity-50 mb-1">Founder Status</p>
                <p className="text-lg font-black text-primary italic">VERIFIED MEMBER</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
