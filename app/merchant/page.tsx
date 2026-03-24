"use client";

import { useSimulation } from '@/components/simulation-context';
import { RoleSwitcher } from '@/components/role-switcher';
import { ChefHat, Clock, AlertTriangle, CheckCircle, Flame, Timer } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { RESTAURANTS } from '@/lib/data';

export default function MerchantPage() {
  const { orders, isRushHour, toggleRushHour, markFoodReady, verifyHandover } = useSimulation();
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>("Biryani Blues");

  // Get unique restaurants from active orders or default list
  const restaurants = Array.from(new Set(orders.map(o => o.restaurantName).concat(["Biryani Blues", "Burger King", "Pizza Hut", "Subway"])));

  // Filter for active orders for the selected restaurant
  const activeOrders = orders.filter(o => 
    o.status !== 'delivered' && 
    o.status !== 'cancelled' && 
    o.restaurantName === selectedRestaurant
  );

  const currentRestaurantDetails = RESTAURANTS.find(r => r.name === selectedRestaurant);

  return (
    <div className="min-h-screen bg-neutral-900 text-white pb-24">
      <header className="bg-neutral-800 border-b border-neutral-700 p-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-neutral-700 rounded-lg">
              <ChefHat size={24} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Kitchen Dashboard</h1>
              <div className="flex flex-col">
                <select 
                  value={selectedRestaurant}
                  onChange={(e) => setSelectedRestaurant(e.target.value)}
                  className="bg-transparent text-lg font-bold text-white border-none p-0 focus:ring-0 cursor-pointer -ml-1"
                >
                  {restaurants.map(r => (
                    <option key={r} value={r} className="bg-neutral-800 text-white">{r}</option>
                  ))}
                </select>
                <p className="text-xs text-neutral-400">{currentRestaurantDetails?.location || "Select Outlet"}</p>
              </div>
            </div>
          </div>

          {/* Rush Hour Toggle */}
          <button
            onClick={toggleRushHour}
            className={cn(
              "flex items-center gap-3 px-4 py-2 rounded-full border transition-all",
              isRushHour 
                ? "bg-orange-500/20 border-orange-500 text-orange-400" 
                : "bg-neutral-800 border-neutral-600 text-neutral-400 hover:bg-neutral-700"
            )}
          >
            <div className={cn("p-1 rounded-full", isRushHour ? "bg-orange-500 text-white" : "bg-neutral-600")}>
              <Flame size={14} fill={isRushHour ? "currentColor" : "none"} />
            </div>
            <span className="text-sm font-medium">
              {isRushHour ? "Rush Mode ON" : "Normal Flow"}
            </span>
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-neutral-800 p-4 rounded-2xl border border-neutral-700">
            <p className="text-xs text-neutral-400 uppercase tracking-wider">Active Orders</p>
            <p className="text-3xl font-bold mt-1">{activeOrders.length}</p>
          </div>
          <div className="bg-neutral-800 p-4 rounded-2xl border border-neutral-700">
            <p className="text-xs text-neutral-400 uppercase tracking-wider">Avg Prep Time</p>
            <p className="text-3xl font-bold mt-1 text-green-400">18m</p>
          </div>
          <div className="bg-neutral-800 p-4 rounded-2xl border border-neutral-700">
            <p className="text-xs text-neutral-400 uppercase tracking-wider">Penalties</p>
            <p className="text-3xl font-bold mt-1 text-red-400">0</p>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Timer size={20} className="text-neutral-400" />
            Preparing Now
          </h2>

          <div className="grid gap-4">
            <AnimatePresence>
              {activeOrders.length === 0 ? (
                <div className="text-center py-12 text-neutral-600 bg-neutral-800/50 rounded-2xl border border-neutral-800 border-dashed">
                  No active orders
                </div>
              ) : (
                activeOrders.map(order => (
                  <MerchantOrderCard 
                    key={order.id} 
                    order={order} 
                    onMarkReady={() => markFoodReady(order.id)}
                    onVerifyOtp={(otp) => verifyHandover(order.id, otp)}
                  />
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <RoleSwitcher />
    </div>
  );
}

function MerchantOrderCard({ order, onMarkReady, onVerifyOtp }: { order: any, onMarkReady: () => void, onVerifyOtp: (otp: string) => boolean }) {
  const [otpInput, setOtpInput] = useState("");
  const [error, setError] = useState(false);

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onVerifyOtp(otpInput);
    if (!success) {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const isReady = order.status === 'ready_for_pickup' || order.status === 'handover_pending' || order.status === 'rider_arrived';
  const isHandoverPending = order.status === 'handover_pending';

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-neutral-800 rounded-2xl border border-neutral-700 overflow-hidden"
    >
      <div className="p-5 flex flex-col md:flex-row gap-6">
        {/* Left: Order Details */}
        <div className="flex-1 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg font-bold text-white">#{order.id}</span>
                <span className="px-2 py-0.5 bg-neutral-700 rounded text-xs text-neutral-300">{order.customerName}</span>
              </div>
              <p className="text-sm text-neutral-400">{order.items.join(", ")}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-mono text-white">
                {Math.floor((Date.now() - order.placedAt) / 60000)}:
                {String(Math.floor(((Date.now() - order.placedAt) / 1000) % 60)).padStart(2, '0')}
              </p>
              <p className="text-xs text-neutral-500">Elapsed Time</p>
            </div>
          </div>

          {/* Rider Status Indicator for Merchant */}
          <div className="flex items-center gap-2 text-sm bg-neutral-900/50 p-2 rounded-lg border border-neutral-700/50">
            <div className={cn("w-2 h-2 rounded-full", order.riderDistance < 100 ? "bg-green-500" : "bg-yellow-500")} />
            <span className="text-neutral-300">
              Rider is {order.riderDistance < 100 ? "at restaurant" : `${(order.riderDistance / 1000).toFixed(1)}km away`}
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="w-full md:w-72 flex flex-col justify-center border-t md:border-t-0 md:border-l border-neutral-700 pt-4 md:pt-0 md:pl-6">
          {!isReady ? (
            <div className="space-y-3">
              <button 
                onClick={onMarkReady}
                className="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle size={20} />
                Mark Food Ready
              </button>
              {order.riderDistance > 500 && (
                <p className="text-xs text-yellow-500 flex items-center gap-1">
                  <AlertTriangle size={12} />
                  Warning: Rider is far. Early marking may cause penalty if not actually ready.
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-700 text-center">
                <p className="text-xs text-neutral-400 mb-1">Status</p>
                <p className={cn("font-bold", isHandoverPending ? "text-yellow-400" : "text-green-400")}>
                  {isHandoverPending ? "Waiting for Handover" : "Ready - Waiting for Rider"}
                </p>
              </div>

              {isHandoverPending && (
                <form onSubmit={handleOtpSubmit} className="space-y-2">
                  <input 
                    type="text" 
                    placeholder="Enter Rider OTP"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    className={cn(
                      "w-full bg-neutral-700 border text-white text-center font-mono text-lg py-2 rounded-xl focus:outline-none focus:ring-2",
                      error ? "border-red-500 focus:ring-red-500" : "border-neutral-600 focus:ring-green-500"
                    )}
                    maxLength={4}
                  />
                  <button 
                    type="submit"
                    className="w-full py-2 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-colors"
                  >
                    Verify & Handover
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Penalty Warning Bar */}
      {order.penalty && (
        <div className="bg-red-500/10 border-t border-red-500/20 p-2 flex items-center justify-center gap-2 text-red-400 text-sm">
          <AlertTriangle size={14} />
          <span>Penalty Applied: {order.penalty}</span>
        </div>
      )}
    </motion.div>
  );
}
