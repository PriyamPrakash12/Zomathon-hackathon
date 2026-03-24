"use client";

import { useSimulation } from '@/components/simulation-context';
import { RoleSwitcher } from '@/components/role-switcher';
import { ShoppingBag, Clock, AlertCircle, CheckCircle2, MapPin, Star, ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { RESTAURANTS, Restaurant } from '@/lib/data';

export default function CustomerPage() {
  const { placeOrder, isRushHour, orders } = useSimulation();
  const [activeTab, setActiveTab] = useState<'restaurants' | 'orders'>('restaurants');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  // Find the most recent active order
  const activeOrder = orders.length > 0 ? orders[0] : null;

  const handleRestaurantClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const handleBackToRestaurants = () => {
    setSelectedRestaurant(null);
  };

  return (
    <div className="min-h-screen bg-neutral-50 pb-24">
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold">Z</div>
            <span className="font-bold text-lg">Zomato</span>
          </div>
          <div className="flex gap-4 text-sm font-medium">
            <button 
              onClick={() => {
                setActiveTab('restaurants');
                setSelectedRestaurant(null);
              }}
              className={cn("py-5 border-b-2 transition-colors", activeTab === 'restaurants' ? "border-red-600 text-red-600" : "border-transparent text-neutral-500")}
            >
              Dining
            </button>
            <button 
              onClick={() => setActiveTab('orders')}
              className={cn("py-5 border-b-2 transition-colors relative", activeTab === 'orders' ? "border-red-600 text-red-600" : "border-transparent text-neutral-500")}
            >
              Orders
              {orders.length > 0 && (
                <span className="absolute top-3 -right-2 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-6">
        {activeTab === 'restaurants' ? (
          selectedRestaurant ? (
            // Restaurant Menu View
            <>
              <button 
                onClick={handleBackToRestaurants}
                className="flex items-center text-sm text-neutral-500 hover:text-neutral-900 mb-2"
              >
                <ChevronLeft size={16} /> Back to Restaurants
              </button>

              {/* Restaurant Header */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-neutral-100">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-xl font-bold text-neutral-900">{selectedRestaurant.name}</h1>
                    <p className="text-sm text-neutral-500">{selectedRestaurant.cuisine} • ₹{selectedRestaurant.priceForTwo} for two</p>
                  </div>
                  <div className="bg-green-700 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                    {selectedRestaurant.rating} <Star size={10} fill="currentColor" />
                  </div>
                </div>

                {/* Rush Hour Indicator */}
                {isRushHour && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-orange-50 border border-orange-100 rounded-xl p-3 flex items-start gap-3"
                  >
                    <div className="p-1.5 bg-orange-100 rounded-full text-orange-600 shrink-0">
                      <Clock size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-orange-800">High Demand at Kitchen</p>
                      <p className="text-xs text-orange-700 mt-0.5">
                        This restaurant is experiencing a rush. Prep time is 15 mins longer than usual.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Menu Items */}
              <div className="space-y-8">
                {selectedRestaurant.menu.map((category) => (
                  <div key={category.name} className="space-y-4">
                    <h2 className="font-bold text-lg text-neutral-900 sticky top-16 bg-neutral-50 py-2 z-5">{category.name}</h2>
                    {category.items.map((item) => (
                      <MenuItem 
                        key={item.name}
                        name={item.name} 
                        price={item.price} 
                        description={item.description}
                        isVeg={item.isVeg}
                        image={item.image}
                        onAdd={() => {
                          placeOrder([item.name], item.price, selectedRestaurant.name);
                          setActiveTab('orders');
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </>
          ) : (
            // Restaurant List View
            <div className="space-y-4">
              <h2 className="font-bold text-lg text-neutral-900">All Restaurants</h2>
              {RESTAURANTS.map((restaurant) => (
                <RestaurantCard 
                  key={restaurant.id} 
                  restaurant={restaurant} 
                  onClick={() => handleRestaurantClick(restaurant)} 
                />
              ))}
            </div>
          )
        ) : (
          // Orders View
          <div className="space-y-4">
            <h2 className="font-bold text-lg text-neutral-900">Your Orders</h2>
            
            {orders.length === 0 ? (
              <div className="text-center py-12 text-neutral-400">
                <ShoppingBag className="mx-auto mb-3 opacity-20" size={48} />
                <p>No active orders</p>
              </div>
            ) : (
              orders.map(order => (
                <OrderCard key={order.id} order={order} />
              ))
            )}
          </div>
        )}
      </main>

      <RoleSwitcher />
    </div>
  );
}

function RestaurantCard({ restaurant, onClick }: { restaurant: Restaurant, onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex gap-4"
    >
      <div className="w-24 h-24 bg-neutral-100 rounded-xl relative overflow-hidden shrink-0">
         <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg text-neutral-900">{restaurant.name}</h3>
          <div className="bg-green-700 text-white text-xs font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
            {restaurant.rating} <Star size={8} fill="currentColor" />
          </div>
        </div>
        <p className="text-sm text-neutral-500">{restaurant.cuisine}</p>
        <p className="text-xs text-neutral-400">₹{restaurant.priceForTwo} for two • {restaurant.deliveryTime}</p>
      </div>
    </div>
  );
}

function MenuItem({ name, price, description, isVeg, image, onAdd }: { name: string, price: number, description: string, isVeg: boolean, image: string, onAdd: () => void }) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-neutral-100 flex justify-between gap-4">
      <div className="space-y-2 flex-1">
        <div className={cn("w-4 h-4 border-2 flex items-center justify-center rounded-[4px]", isVeg ? "border-green-600" : "border-red-600")}>
          <div className={cn("w-2 h-2 rounded-full", isVeg ? "bg-green-600" : "bg-red-600")} />
        </div>
        <h3 className="font-bold text-neutral-900">{name}</h3>
        <p className="text-xs text-neutral-500 line-clamp-2">{description}</p>
        <p className="text-sm font-medium">₹{price}</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 shrink-0">
        <div className="w-24 h-24 bg-neutral-100 rounded-xl relative overflow-hidden">
           <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onAdd();
          }}
          className="px-6 py-1.5 bg-white border border-red-500 text-red-600 font-bold rounded-lg text-sm shadow-sm uppercase hover:bg-red-50"
        >
          Add
        </button>
      </div>
    </div>
  );
}

function OrderCard({ order }: { order: any }) {
  const getStatusColor = (status: string) => {
    if (status === 'delivered') return 'text-green-600 bg-green-50';
    if (status === 'cancelled') return 'text-red-600 bg-red-50';
    return 'text-blue-600 bg-blue-50';
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'placed': return 'Order Placed';
      case 'preparing': return 'Preparing your food';
      case 'ready_for_pickup': return 'Food is ready';
      case 'rider_arrived': return 'Rider at restaurant';
      case 'handover_pending': return 'Handover in progress';
      case 'picked_up': return 'Out for delivery';
      case 'delivered': return 'Delivered';
      default: return status;
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-neutral-100 shadow-sm space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-neutral-900">{order.restaurantName}</h3>
          <p className="text-xs text-neutral-500">Order #{order.id}</p>
        </div>
        <span className={cn("px-2 py-1 rounded-md text-xs font-bold uppercase", getStatusColor(order.status))}>
          {getStatusText(order.status)}
        </span>
      </div>

      <div className="border-t border-neutral-100 pt-4 space-y-3">
        {order.items.map((item: string, i: number) => (
          <div key={i} className="flex justify-between text-sm">
            <span className="text-neutral-700">1 x {item}</span>
          </div>
        ))}
      </div>

      {order.isRushHourOrder && (
        <div className="bg-orange-50 p-3 rounded-lg flex gap-2 items-start">
          <Clock size={14} className="text-orange-600 mt-0.5" />
          <p className="text-xs text-orange-700">
            This order was placed during rush hour. Thank you for your patience.
          </p>
        </div>
      )}

      {/* Live Tracking Simulation */}
      {order.status !== 'delivered' && order.status !== 'cancelled' && (
        <div className="bg-neutral-50 p-3 rounded-xl space-y-2">
          <div className="flex justify-between text-xs font-medium text-neutral-500">
            <span>Rider Status</span>
            <span>{order.riderDistance > 50 ? `${(order.riderDistance / 1000).toFixed(1)} km away` : 'Arrived'}</span>
          </div>
          <div className="h-1.5 bg-neutral-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-blue-500"
              initial={{ width: '0%' }}
              animate={{ width: `${Math.max(5, 100 - (order.riderDistance / 2000 * 100))}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
