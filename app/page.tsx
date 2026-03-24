"use client";

import { RoleSwitcher } from '@/components/role-switcher';
import { ArrowRight, ChefHat, Bike, ShoppingBag, TrendingUp, Clock, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl w-full z-10 space-y-12">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium uppercase tracking-wider">
            Zomathon Prototype
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900">
            KPT <span className="text-red-600">Optimizer</span>
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            A solution to improve Kitchen Prep Time prediction accuracy by integrating rider location signals and merchant-controlled rush hour inputs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <RoleCard 
            title="Customer" 
            description="Experience the new 'Rush Hour' transparency and reliable ETAs."
            icon={ShoppingBag}
            href="/customer"
            color="bg-blue-50 text-blue-600 hover:border-blue-200"
          />
          <RoleCard 
            title="Merchant" 
            description="Manage orders, toggle 'Rush Mode', and verify handovers securely."
            icon={ChefHat}
            href="/merchant"
            color="bg-orange-50 text-orange-600 hover:border-orange-200"
          />
          <RoleCard 
            title="Rider" 
            description="Location-based arrival signals and OTP verification for pickups."
            icon={Bike}
            href="/rider"
            color="bg-green-50 text-green-600 hover:border-green-200"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6 pt-8 border-t border-neutral-200">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg text-red-600">
                <AlertTriangle size={20} />
              </div>
              <h3 className="font-semibold text-neutral-900">Problem 1: Fake 'Food Ready'</h3>
            </div>
            <p className="text-sm text-neutral-600">
              Merchants mark food ready early to avoid penalties, causing rider wait times.
            </p>
            <div className="text-sm font-medium text-red-600 flex items-center gap-2">
              Solution: <span className="text-neutral-900">Location-based Handover & OTP</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                <TrendingUp size={20} />
              </div>
              <h3 className="font-semibold text-neutral-900">Problem 2: Invisible Rush</h3>
            </div>
            <p className="text-sm text-neutral-600">
              System doesn't know about offline/competitor rush, leading to unrealistic KPTs.
            </p>
            <div className="text-sm font-medium text-orange-600 flex items-center gap-2">
              Solution: <span className="text-neutral-900">Merchant Rush Toggle & Incentives</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <Clock size={20} />
              </div>
              <h3 className="font-semibold text-neutral-900">Problem 3: Rider Wait Time</h3>
            </div>
            <p className="text-sm text-neutral-600">
              Riders arrive too early or wait too long due to inaccurate prep time estimates.
            </p>
            <div className="text-sm font-medium text-blue-600 flex items-center gap-2">
              Solution: <span className="text-neutral-900">Dynamic KPT & Arrival Sync</span>
            </div>
          </div>
        </div>
      </div>
      
      <RoleSwitcher />
    </div>
  );
}

function RoleCard({ title, description, icon: Icon, href, color }: any) {
  return (
    <Link 
      href={href}
      className={cn(
        "group relative p-8 rounded-3xl border border-transparent transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white",
        "hover:border-neutral-200"
      )}
    >
      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors", color)}>
        <Icon size={24} />
      </div>
      <h2 className="text-2xl font-bold text-neutral-900 mb-3">{title}</h2>
      <p className="text-neutral-500 leading-relaxed mb-6">
        {description}
      </p>
      <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900 group-hover:gap-3 transition-all">
        Launch View <ArrowRight size={16} />
      </div>
    </Link>
  );
}
