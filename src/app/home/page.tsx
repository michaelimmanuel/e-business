"use client";
import Card from '@/components/Card';
import React, { useState } from "react";
import MealModal from "@/components/MealModal";
import CartModal from "@/components/CartModal";

const meals = [
  {
    id: 1,
    title: "Zucchini Noodles with Pesto",
    category: "Low Carb",
    description: "Spiralized zucchini tossed in fresh basil pesto with cherry tomatoes.",
    calories: 280,
    prepTime: "15 min",
    image: "/images/food/zoodles-pesto.jpg",
    price: 25000,
    tags: ["low carb", "vegetarian", "gluten-free"],
  },
  {
    id: 2,
    title: "Chickpea Buddha Bowl",
    category: "Vegetarian",
    description: "Roasted chickpeas, quinoa, veggies, and tahini dressing in a bowl.",
    calories: 430,
    prepTime: "20 min",
    image: "/images/food/buddha-bowl.jpg",
    price: 32000,
    tags: ["vegetarian", "fiber-rich"],
  },
  {
    id: 3,
    title: "Grilled Chicken & Veggies",
    category: "High Protein",
    description: "Grilled chicken breast with roasted peppers, zucchini, and brown rice.",
    calories: 520,
    prepTime: "25 min",
    image: "/images/food/chicken-veggies.jpg",
    price: 40000,
    tags: ["high protein", "meal prep"],
  },
  {
    id: 4,
    title: "Tofu Stir Fry",
    category: "Vegetarian",
    description: "Crispy tofu sautéed with bell peppers, broccoli, and soy sauce.",
    calories: 350,
    prepTime: "15 min",
    image: "/images/food/tofu-stirfry.jpg",
    price: 28000,
    tags: ["vegetarian", "plant-based", "quick"],
  },
  {
    id: 5,
    title: "Egg White Omelette",
    category: "Low Carb",
    description: "Fluffy egg white omelette with spinach, mushrooms, and feta.",
    calories: 210,
    prepTime: "10 min",
    image: "/images/food/egg-omelette.jpg",
    price: 22000,
    tags: ["low carb", "quick"],
  },
  {
    id: 6,
    title: "Salmon Power Bowl",
    category: "High Protein",
    description: "Grilled salmon with quinoa, edamame, and a lemon vinaigrette.",
    calories: 510,
    prepTime: "20 min",
    image: "/images/food/salmon-bowl.jpg",
    price: 39000,
    tags: ["high protein", "omega-3"],
  }
];

const categories = ["All", "Low Carb", "Vegetarian", "High Protein"];


const page = () => {
    const [selectedMeal, setSelectedMeal] = useState<typeof meals[number] | null>(null);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [cart, setCart] = useState<any>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    console.log(cart);

    const filteredMeals =
    selectedCategory === "All"
      ? meals
      : meals.filter((meal) => meal.category === selectedCategory);

    const handleMealClick = (meal:any) => {
        setSelectedMeal(meal);
    };

    const handleCloseModal = () => {
        setSelectedMeal(null);
    };

    const handleAddToCart = (meal: any, quantity: number) => {
      setCart((prev: any[]) => {
        const existing = prev.find((item) => item.meal.id === meal.id);
        if (existing) {
        return prev.map((item) =>
          item.meal.id === meal.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
        );
        }
        return [...prev, { meal, quantity }];
      });
        setSelectedMeal(null);
    };

    return (
        <div className='pt-4'>
            <div className="flex justify-center gap-4 mb-6 px-4">
                {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2 py-1 rounded-lg font-medium text-sm ${
                    selectedCategory === cat
                        ? "bg-bg text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                >
                    {cat}
                </button>
                ))}
            </div>

            <div className='w-full bg-white  px-4 flex-row gap-4'>
            {filteredMeals.map((meal) => (
                <Card key={meal.id} meal={meal} onClick={() => handleMealClick(meal)} />
            ))}
                    
            </div>
            <MealModal 
              meal={selectedMeal} 
              onClose={handleCloseModal}
              onAddToCart={handleAddToCart}
            />
            {isCartOpen && (
              <CartModal
                cart={cart}
                onClose={() => setIsCartOpen(false)}
                onUpdateCart={setCart}
              />
            )}
            {cart.length > 0 && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full flex justify-center px-4">
                <button
                  className="bg-bg text-white px-4 py-4 w-full rounded-sm shadow-lg"
                  onClick={() => setIsCartOpen(true)}
                >
                  🛒 Cart ({cart.length})
                </button>
                </div>
            )}
        </div>
    )
}

export default page