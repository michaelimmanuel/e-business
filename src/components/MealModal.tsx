"use client";
import React, { useState , useEffect, useRef} from "react";
import Image from "next/image";
// import gsap from "gsap";

type Meal = {
  title: string;
  price: number;
  image: string;
  description: string;
};

type MealModalProps = {
  meal: Meal | null;
  onClose: () => void;
};


const MealModal = ({ meal, onClose }: MealModalProps) => {
    const [quantity, setQuantity] = useState(1);
    const modalRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);

     useEffect(() => {
        setQuantity(1);
    }, [meal]);

    
    

    if (!meal) return null;

    const formatPrice = (price: number) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
    }).format(price);

    const formattedPrice = formatPrice(meal.price * quantity);

    const price = formatPrice(meal.price);
    const increment = () => setQuantity(q => q + 1);
    const decrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));

    return (

        
        <div className="fixed inset-0 bg-white bg-opacity-80 z-50 flex flex-col items-center">
        <div className="w-full max-w-md">
            <div className="relative aspect-square w-full rounded-lg overflow-hidden z-3">
            <Image
                src={meal.image}
                alt={meal.title}
                fill
                className="object-cover object-center"
            />
            </div>

            <div className="relative -mt-20 z-10 px-4 h-full bg-white rounded-3xl pt-1">
                <div className="mt-4 text-black text-center">
                    <h2 className="text-2xl font-bold">{meal.title}</h2>
                    <p className="text-lg mt-2">{price}</p>
                </div>

                <div className="mt-4 text-black">
                    <h3 className="text-lg font-semibold">Description</h3>
                    <p className="text-sm mt-2">{meal.description}</p>
                </div>

                <div className="mt-6">
                    <h3 className="font-bold text-black">Order</h3>
                    <div className="mt-2 flex items-center justify-between">
                        <span className="text-black text-sm font-medium">{quantity} Porsi</span>
                        <div className="flex items-center gap-4">
                            <button
                            onClick={decrement}
                            className="w-10 h-10 bg-gray-200 text-xl font-bold hover:bg-gray-300"
                            >
                            −
                            </button>
                            <button
                            onClick={increment}
                            className="w-10 h-10 bg-gray-200 text-xl font-bold hover:bg-gray-300"
                            >
                            +
                            </button>
                        </div>
                    </div>

                    <div className="mt-3 text-right">
                        <p className="text-sm text-gray-600">Total:</p>
                        <p className="text-lg text-black">{formattedPrice}</p>
                    </div>
                </div>
                <button
                    onClick={() => onClose()}
                    className="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-11/12 max-w-md bg-bg text-white font-semibold py-4 rounded-lg shadow-lg"
                >
                    Confirm Order
                </button>
            </div>
        </div>

        

        <button
            onClick={onClose}
            className="z-100 absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-black text-2xl font-bold rounded-full bg-white/30 backdrop-blur-md shadow-md hover:bg-white/50 transition"
        >
            ×
        </button>
        </div>
    );
};

export default MealModal;
