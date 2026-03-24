"use client";

import { useSimulation } from '@/components/simulation-context';
import { RoleSwitcher } from '@/components/role-switcher';
import { Bike, MapPin, Navigation, Phone, MessageSquare, Clock, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { RESTAURANTS } from '@/lib/data';

export default function RiderPage() {
  const { orders, updateRiderDistance, riderArrive } = useSimulation();
  
  // Filter for active orders assigned to rider (for demo, just take the first active one)
  const activeOrder = orders.find(o => o.status !== 'delivered' && o.status !== 'cancelled');

  // Get restaurant details
  const restaurantDetails = activeOrder 
    ? RESTAURANTS.find(r => r.name === activeOrder.restaurantName) 
    : null;

  return (
    <div className="min-h-screen bg-slate-100 pb-24">
      {/* Map Header Simulation */}
      <div className="h-64 bg-slate-300 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
           <div className="bg-white/80 backdrop-blur px-4 py-2 rounded-full text-slate-600 font-mono text-xs">
             Map Simulation View
           </div>
        </div>
        
        {/* Route Line */}
        <div className="absolute top-1/2 left-1/2 w-full h-1 bg-blue-500 -translate-y-1/2 -translate-x-1/2 opacity-50" />
      </div>

      <main className="max-w-md mx-auto -mt-20 relative z-10 px-4 space-y-4">
        {!activeOrder ? (
          <div className="bg-white p-6 rounded-3xl shadow-lg text-center space-y-4">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
              <Bike size={32} />
            </div>
            <h2 className="text-xl font-bold text-slate-800">You are online</h2>
            <p className="text-slate-500">Waiting for new orders...</p>
          </div>
        ) : (
          <>
            {/* Order Status Card */}
            <div className="bg-white p-6 rounded-3xl shadow-xl space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{activeOrder.restaurantName}</h2>
                  <p className="text-slate-500 text-sm">{restaurantDetails?.location || "Location unavailable"}</p>
                </div>
                <div className="bg-slate-100 p-2 rounded-full">
                  <Navigation className="text-blue-600" size={24} />
                </div>
              </div>

              {/* Distance Slider Simulation */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-slate-500">Distance to Restaurant</span>
                  <span className="text-slate-900">{(activeOrder.riderDistance / 1000).toFixed(1)} km</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="2000" 
                  step="50"
                  value={2000 - activeOrder.riderDistance} // Invert for UI: Left is far, Right is close
                  onChange={(e) => updateRiderDistance(activeOrder.id, 2000 - parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <p className="text-xs text-slate-400 text-center">Drag slider to simulate moving towards restaurant</p>
              </div>

              {/* Action Area */}
              <div className="pt-4 border-t border-slate-100">
                {activeOrder.status === 'ready_for_pickup' || activeOrder.status === 'handover_pending' ? (
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-100 p-4 rounded-xl flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-full text-green-600">
                        <CheckCircle size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-green-800">Food is Ready!</p>
                        <p className="text-xs text-green-700">Merchant has marked the order ready.</p>
                      </div>
                    </div>

                    {activeOrder.riderDistance < 100 ? (
                      <div className="text-center space-y-2">
                        <p className="text-sm text-slate-500">Show this OTP to Merchant</p>
                        <div className="text-4xl font-mono font-bold tracking-widest text-slate-900 bg-slate-100 py-4 rounded-xl border border-slate-200">
                          {activeOrder.otp || "----"}
                        </div>
                        <p className="text-xs text-red-500 animate-pulse">
                          Expires in 5:00
                        </p>
                      </div>
                    ) : (
                      <div className="bg-yellow-50 border border-yellow-100 p-3 rounded-xl text-center">
                        <p className="text-sm text-yellow-800 font-medium">Reach within 50m to view OTP</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                     <div className="flex items-center justify-between text-sm text-slate-600 bg-slate-50 p-3 rounded-xl">
                        <span>Expected Ready Time</span>
                        <span className="font-bold">12:45 PM</span>
                     </div>
                     
                     {activeOrder.riderDistance < 100 && (
                       <button 
                         onClick={() => riderArrive(activeOrder.id)}
                         disabled={activeOrder.status === 'rider_arrived'}
                         className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all disabled:bg-slate-300 disabled:shadow-none"
                       >
                         {activeOrder.status === 'rider_arrived' ? "Waiting for Food..." : "I have Arrived"}
                       </button>
                     )}
                  </div>
                )}
              </div>
            </div>

            {/* Order Details */}
            <div className="bg-white p-6 rounded-3xl shadow-lg space-y-4">
              <h3 className="font-bold text-slate-900">Order Details</h3>
              <div className="space-y-2">
                {activeOrder.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm text-slate-600">
                    <span>1 x {item}</span>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-slate-100 flex justify-between font-bold text-slate-900">
                <span>Total Bill</span>
                <span>₹{activeOrder.totalAmount}</span>
              </div>
            </div>
          </>
        )}
      </main>

      <RoleSwitcher />
    </div>
  );
}
