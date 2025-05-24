"use client";
import React from "react";

type CartItem = {
  meal: {
    id: number;
    title: string;
    price: number;
    image: string;
  };
  quantity: number;
};

type Props = {
  cart: CartItem[];
  onClose: () => void;
  onUpdateCart: (cart: CartItem[]) => void;
};

const CartModal = ({ cart, onClose, onUpdateCart }: Props) => {
  const total = cart.reduce((acc, item) => acc + item.meal.price * item.quantity, 0);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);

  const increment = (id: number) =>
    onUpdateCart(
      cart.map(item =>
        item.meal.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );

  const decrement = (id: number) =>
    onUpdateCart(
      cart
        .map(item =>
          item.meal.id === id
            ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );

  const remove = (id: number) =>
    onUpdateCart(cart.filter(item => item.meal.id !== id));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center px-4">
      <div className="bg-white rounded-xl w-full max-w-md p-4 overflow-y-auto max-h-[90vh] relative">
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          cart.map(item => (
            <div key={item.meal.id} className="mb-4 border-b pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{item.meal.title}</h3>
                  <p className="text-sm text-gray-500">
                    {item.quantity} x {formatPrice(item.meal.price)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decrement(item.meal.id)}
                    className="w-8 h-8 bg-gray-200 text-lg"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increment(item.meal.id)}
                    className="w-8 h-8 bg-gray-200 text-lg"
                  >
                    +
                  </button>
                  <button
                    onClick={() => remove(item.meal.id)}
                    className="text-red-500 text-sm ml-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}

        {cart.length > 0 && (
          <>
            <div className="text-right font-semibold text-lg mt-2">
              Total: {formatPrice(total)}
            </div>
            <button
              onClick={() => alert("Proceeding to checkout...")}
              className="w-full mt-4 bg-violet-600 text-white py-3 rounded-lg font-semibold"
            >
              Checkout
            </button>
          </>
        )}

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl font-bold text-gray-700 hover:text-black"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default CartModal;
