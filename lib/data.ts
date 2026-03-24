
export interface MenuItemData {
  name: string;
  price: number;
  description: string;
  isVeg: boolean;
  image: string;
}

export interface MenuCategory {
  name: string;
  items: MenuItemData[];
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  priceForTwo: number;
  deliveryTime: string;
  location: string;
  image: string;
  menu: MenuCategory[];
}

export const RESTAURANTS: Restaurant[] = [
  {
    id: "r1",
    name: "Biryani Blues",
    cuisine: "North Indian, Biryani",
    rating: 4.2,
    priceForTwo: 400,
    deliveryTime: "30-35 min",
    location: "Sector 29, Gurgaon",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&q=80",
    menu: [
      {
        name: "Recommended",
        items: [
          { name: "Chicken Dum Biryani", price: 340, description: "Richly flavored aromatic rice layered with marinated chicken pieces in a delicate blend of whole spices.", isVeg: false, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80" },
          { name: "Paneer Butter Masala", price: 280, description: "Cottage cheese simmered in a rich, buttery, and creamy tomato-based gravy.", isVeg: true, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&q=80" },
        ]
      },
      {
        name: "Starters",
        items: [
          { name: "Chicken 65", price: 290, description: "Spicy, deep-fried chicken dish originating from Hotel Buhari, Chennai.", isVeg: false, image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=800&q=80" },
          { name: "Paneer Tikka", price: 260, description: "Chunks of paneer marinated in spices and grilled in a tandoor.", isVeg: true, image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&q=80" },
        ]
      }
    ]
  },
  {
    id: "r2",
    name: "Burger King",
    cuisine: "Burger, Fast Food",
    rating: 4.1,
    priceForTwo: 350,
    deliveryTime: "25-30 min",
    location: "DLF Cyber Hub, Gurgaon",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&q=80",
    menu: [
      {
        name: "Whopper",
        items: [
          { name: "Veg Whopper", price: 179, description: "Our signature Whopper with 7 layers between the buns.", isVeg: true, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80" },
          { name: "Chicken Whopper", price: 199, description: "Our signature Whopper with 7 layers between the buns.", isVeg: false, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80" },
        ]
      },
      {
        name: "Sides",
        items: [
          { name: "Fries (Med)", price: 119, description: "The perfect crispy partner.", isVeg: true, image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=800&q=80" },
          { name: "Chicken Nuggets (6pcs)", price: 169, description: "Juicy chicken nuggets.", isVeg: false, image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&q=80" },
        ]
      }
    ]
  },
  {
    id: "r3",
    name: "Pizza Hut",
    cuisine: "Pizza, Fast Food",
    rating: 3.9,
    priceForTwo: 500,
    deliveryTime: "40-45 min",
    location: "Ambience Mall, Vasant Kunj",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    menu: [
      {
        name: "Bestsellers",
        items: [
          { name: "Margherita", price: 249, description: "Classic cheese pizza.", isVeg: true, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80" },
          { name: "Chicken Pepperoni", price: 329, description: "American classic! Spicy herbed chicken pepperoni on pizza.", isVeg: false, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80" },
        ]
      }
    ]
  },
  {
    id: "r4",
    name: "Subway",
    cuisine: "Healthy, Salads",
    rating: 4.3,
    priceForTwo: 300,
    deliveryTime: "20-25 min",
    location: "Connaught Place, New Delhi",
    image: "https://images.unsplash.com/photo-1571805618149-3a772570ebcd?w=800&q=80",
    menu: [
      {
        name: "Subs",
        items: [
          { name: "Veggie Delite", price: 210, description: "A wholesome combination of fresh vegetables.", isVeg: true, image: "https://images.unsplash.com/photo-1603903631889-b5f3ba4d5b9b?w=800&q=80" },
          { name: "Roasted Chicken", price: 240, description: "Succulent roasted chicken strips.", isVeg: false, image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800&q=80" },
        ]
      }
    ]
  }
];
