"use client";
import CheckOutForm from "@/components/CheckOutForm/CheckOutForm";
import euroCountries from "@/Data/Countries";
import { AuthContext } from "@/hooks/AuthProvider";
import { SettingsContext } from "@/hooks/SettingsProvider";
import withProtectedRoute from "@/Wrapper/protectedRoute";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function CheckOut() {

  
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  let token = Cookies.get("ny-token");
  const router = useRouter();

  /* -------- Currency -------- */

  const getCurrencyInfo = () => {

      return {
        currency: "BDT",
        rate: 1,
        symbol: "BDT ",
      };
    
  };

  const renderPrice = (price) => {
    const { symbol, rate } = getCurrencyInfo();
    return `${symbol}${Number(price * rate).toFixed(2)}`;
  };

  /* -------- Load Cart -------- */

  useEffect(() => {

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    setCartItems(storedCart);

    const total = storedCart.reduce(
      (sum, item) => sum + item.askingPrice * item.quantity,
      0
    );

    setTotalPrice(total);

  }, []);


  return (
    <div className="container mx-auto font-futara-sans">

      <div className="relative mx-auto w-full bg-white">

        <div className="grid min-h-screen grid-cols-10">

          {/* LEFT SIDE FORM */}

          <div className="col-span-full py-8 px-6 sm:py-14 lg:col-span-6 lg:py-24">
            <CheckOutForm />
          </div>

          {/* RIGHT SIDE ORDER SUMMARY */}

          <div className="col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24 sticky top-24 h-[calc(100vh-5rem)] overflow-auto" style={{marginTop:'-50px'}}>

            <div>
              <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-[#be834f] to-[#be834f] opacity-95"></div>
            </div>

            <div className="relative">

              <ul className="space-y-5">

                {cartItems.map((item) => (

                  <li key={item._id} className="flex justify-between">

                    <div className="inline-flex">

                      <img
                        src={item.images?.[0]}
                        alt={item.name}
                        className="max-h-16"
                      />

                      <div className="ml-3">

                        <p className="text-base font-extralight text-white">
                          {item.name}
                        </p>

                        <p className="text-sm font-medium text-white text-opacity-80">
                          Quantity: {item.quantity}
                        </p>

                      </div>

                    </div>

                    <p className="text-sm font-extralight text-white">
                      {renderPrice(item.askingPrice * item.quantity)}
                    </p>

                  </li>

                ))}

              </ul>

              <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>

              <div className="space-y-2 mt-5">

                <p className="flex justify-between text-lg font-light text-white">
                  <span>Subtotal price:</span>
                  <span>{renderPrice(totalPrice)}</span>
                </p>

                <p className="flex justify-between text-lg font-light text-white">
                  <span>Total price:</span>
                  <span>{renderPrice(totalPrice)}</span>
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default withProtectedRoute(CheckOut);