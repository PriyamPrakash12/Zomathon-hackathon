"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type OrderStatus = 
  | 'placed' 
  | 'preparing' 
  | 'ready_for_pickup' 
  | 'rider_arrived' 
  | 'handover_pending' 
  | 'picked_up' 
  | 'delivered'
  | 'cancelled';

export interface Order {
  id: string;
  customerName: string;
  restaurantName: string;
  items: string[];
  totalAmount: number;
  status: OrderStatus;
  placedAt: number;
  expectedPrepTime: number; // in minutes
  isRushHourOrder: boolean;
  riderDistance: number; // in meters
  riderArrivedAt?: number;
  readyMarkedAt?: number;
  otp?: string;
  penalty?: string | null;
}

interface SimulationContextType {
  orders: Order[];
  isRushHour: boolean;
  toggleRushHour: () => void;
  placeOrder: (items: string[], total: number, restaurantName: string) => void;
  updateRiderDistance: (orderId: string, distance: number) => void;
  markFoodReady: (orderId: string) => void;
  riderArrive: (orderId: string) => void;
  verifyHandover: (orderId: string, otp: string) => boolean;
  activeOrderId: string | null;
  setActiveOrderId: (id: string | null) => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export function SimulationProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isRushHour, setIsRushHour] = useState(false);
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);

  const toggleRushHour = () => setIsRushHour(prev => !prev);

  const placeOrder = (items: string[], total: number, restaurantName: string) => {
    const newOrder: Order = {
      id: Math.random().toString(36).substring(7).toUpperCase(),
      customerName: "Priya Sharma",
      restaurantName,
      items,
      totalAmount: total,
      status: 'placed',
      placedAt: Date.now(),
      expectedPrepTime: isRushHour ? 45 : 30, // Higher KPT during rush hour
      isRushHourOrder: isRushHour,
      riderDistance: 2000, // Start 2km away
    };
    setOrders(prev => [newOrder, ...prev]);
    setActiveOrderId(newOrder.id);
  };

  const updateRiderDistance = (orderId: string, distance: number) => {
    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;
      
      // Auto-trigger arrival if close enough
      if (distance < 50 && order.status !== 'picked_up' && order.status !== 'delivered') {
         // This logic is handled in the UI or explicit action usually, but we can update state here
      }
      return { ...order, riderDistance: distance };
    }));
  };

  const riderArrive = (orderId: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;
      return { 
        ...order, 
        riderArrivedAt: Date.now(),
        // If food was already ready, we move to handover pending
        status: order.status === 'ready_for_pickup' ? 'handover_pending' : 'preparing'
      };
    }));
  };

  const markFoodReady = (orderId: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;
      
      const isRiderClose = order.riderDistance < 100;
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      
      return { 
        ...order, 
        status: isRiderClose ? 'handover_pending' : 'ready_for_pickup',
        readyMarkedAt: Date.now(),
        otp: otp
      };
    }));
  };

  const verifyHandover = (orderId: string, inputOtp: string) => {
    let success = false;
    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;
      if (order.otp === inputOtp) {
        success = true;
        return { ...order, status: 'picked_up' };
      }
      return order;
    }));
    return success;
  };

  // Penalty Simulation Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(prev => prev.map(order => {
        if (order.status === 'delivered' || order.status === 'cancelled' || order.status === 'picked_up') return order;

        const elapsedMinutes = (Date.now() - order.placedAt) / 60000;
        
        // 1. Late Penalty: If prep takes longer than expected and Rush Mode wasn't used
        if (order.status === 'preparing' && elapsedMinutes > order.expectedPrepTime && !order.isRushHourOrder && !order.penalty) {
          return { ...order, penalty: "Late Prep (Rush Mode Not Used)" };
        }

        // 2. Fake Ready Penalty: If marked ready but rider was far, and it's been "waiting" too long (simulated > 30s for demo)
        // In real life this would be minutes.
        if (order.status === 'ready_for_pickup' && order.riderDistance > 500 && order.readyMarkedAt && (Date.now() - order.readyMarkedAt > 30000) && !order.penalty) {
           return { ...order, penalty: "Premature Ready Signal Detected" };
        }

        // 3. Handover Delay Penalty: If rider is there (handover pending) but merchant hasn't verified OTP
        if (order.status === 'handover_pending' && order.readyMarkedAt && (Date.now() - order.readyMarkedAt > 45000) && !order.penalty) {
            return { ...order, penalty: "Handover Delay (Rider Waiting)" };
        }

        return order;
      }));
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <SimulationContext.Provider value={{
      orders,
      isRushHour,
      toggleRushHour,
      placeOrder,
      updateRiderDistance,
      markFoodReady,
      riderArrive,
      verifyHandover,
      activeOrderId,
      setActiveOrderId
    }}>
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulation() {
  const context = useContext(SimulationContext);
  if (context === undefined) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
}
