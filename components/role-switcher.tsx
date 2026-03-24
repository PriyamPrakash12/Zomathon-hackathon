"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, ChefHat, Bike, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';

export function RoleSwitcher() {
  const pathname = usePathname();

  const roles = [
    { name: 'Customer', path: '/customer', icon: ShoppingBag },
    { name: 'Merchant', path: '/merchant', icon: ChefHat },
    { name: 'Rider', path: '/rider', icon: Bike },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-black/90 text-white backdrop-blur-md rounded-full px-2 py-2 shadow-2xl border border-white/10 flex items-center gap-1">
      <Link 
        href="/"
        className={cn(
          "p-3 rounded-full transition-all hover:bg-white/20",
          pathname === '/' ? "bg-white/20 text-white" : "text-white/60"
        )}
      >
        <LayoutDashboard size={20} />
      </Link>
      <div className="w-px h-6 bg-white/20 mx-1" />
      {roles.map((role) => {
        const isActive = pathname.startsWith(role.path);
        const Icon = role.icon;
        return (
          <Link
            key={role.path}
            href={role.path}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full transition-all",
              isActive 
                ? "bg-white text-black font-medium" 
                : "text-white/60 hover:bg-white/10 hover:text-white"
            )}
          >
            <Icon size={18} />
            <span className="text-sm">{role.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
