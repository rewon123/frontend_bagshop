import React, { useState, useEffect } from "react";
import { CgClose } from "react-icons/cg";
import Button3 from "../Button3/Button3";
import Link from "next/link";

function CartDrawer({ isDrawerOpen, toggleDrawer }) {

  const [cartItems, setCartItems] = useState([]);

  /* -------- LOAD CART -------- */
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, [isDrawerOpen]);

  /* -------- UPDATE LOCAL STORAGE -------- */
  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  /* -------- INCREMENT -------- */
  const increment = (id) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    updateCart(updatedCart);
  };

  /* -------- DECREMENT -------- */
  const decrement = (id) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id
        ? { ...item, quantity: Math.max(1, item.quantity - 1) }
        : item
    );

    updateCart(updatedCart);
  };

  /* -------- REMOVE ITEM -------- */
  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    updateCart(updatedCart);
  };

  /* -------- SUBTOTAL -------- */
  const subtotal = cartItems.reduce(
    (total, item) => total + item.askingPrice * item.quantity,
    0
  );

  return (
    <div
      className={`!z-50 fixed rounded-lg top-16 lg:top-0 right-0 h-full w-80 bg-white shadow-2xl border transition-transform duration-300 ${
        isDrawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 relative h-full flex flex-col justify-between">

        {/* HEADER */}
        <div>
          <div className="flex justify-between">
            <p className="tracking-widest font-extralight">CART</p>
            <CgClose className="cursor-pointer" onClick={toggleDrawer} />
          </div>

          <hr className="my-4" />

          {/* CART ITEMS */}
          <div className="overflow-auto max-h-[60vh] flex flex-col gap-6">

            {cartItems.length === 0 && (
              <p className="text-center text-sm text-gray-500">
                Your cart is empty
              </p>
            )}

            {cartItems.map((product) => (
              <div
                className="flex gap-4 items-center"
                key={product._id}
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-20 h-20 object-cover"
                />

                <div className="flex flex-col gap-2 flex-1">

                  <p className="text-sm">{product.name}</p>

                  <p className="text-xs text-gray-500">
                    {product.askingPrice} TAKA
                  </p>

                  {/* QUANTITY CONTROL */}
                  <div className="flex items-center border w-fit">

                    <button
                      className="px-2 py-1"
                      onClick={() => decrement(product._id)}
                    >
                      −
                    </button>

                    <span className="px-3 text-sm">
                      {product.quantity}
                    </span>

                    <button
                      className="px-2 py-1"
                      onClick={() => increment(product._id)}
                    >
                      +
                    </button>

                  </div>

                  <p
                    onClick={() => handleRemove(product._id)}
                    className="text-xs underline cursor-pointer"
                  >
                    Remove
                  </p>

                </div>
              </div>
            ))}

          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t pt-4">

          <div className="flex justify-between mb-3">
            <p className="text-sm">Subtotal</p>
            <p className="text-sm">{subtotal} TAKA</p>
          </div>

          <p className="text-gray-500 text-xs pb-3">
            Taxes and shipping calculated at checkout
          </p>

          <Link href={cartItems.length === 0 ? "#" : "/checkout"}>
            <Button3
              text={
                cartItems.length === 0
                  ? "Add products to checkout"
                  : "PROCEED TO CHECKOUT"
              }
              backgroundColor={
                cartItems.length === 0 ? "#d3d3d3" : "#f5db8b"
              }
              borderColor={
                cartItems.length === 0 ? "#d3d3d3" : "#f5db8b"
              }
              textColor={
                cartItems.length === 0 ? "#a9a9a9" : "black"
              }
            />
          </Link>

        </div>
      </div>
    </div>
  );
}

export default CartDrawer;