import React from 'react'
import Image from 'next/image'

type Meal = {
  title: string;
  price: number;
  image: string;
};

type MealCardProps = {
  meal: Meal;
  onClick?: (meal: Meal) => void;
};

const Card = ({ meal, onClick }: MealCardProps) => {
    const { title, price, image } = meal;
    const formattedPrice = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(price);
    const handleClick = () => {
        if (onClick) onClick(meal);
    };

    return (
        <div 
        className="w-full max-w-sm mx-auto rounded-xl overflow-hidden shadow-md bg-transparent mt-4"
        onClick={handleClick}
        >
        <div className="relative aspect-[16/9] w-full">
            <Image
            src={image}
            alt={title}
            fill
            className="object-cover object-center"
            />
        </div>
        <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
            <p className="text-primary text-sm mt-1">{formattedPrice}</p>
        </div>
        </div>
    );
};

export default Card