"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { FaShoppingBag } from "react-icons/fa";
import { motion, AnimatePresence } from "motion/react";
import CartDrawer from "@/containers/common/CartDrawer/CartDrawer";

function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [cartDrawer, setCartDrawer] = useState(false);
  const navbarRef = useRef(null);

  const toggleDropdown = (dropdownName) => {
    if (activeDropdown === dropdownName) setActiveDropdown(null);
    else setActiveDropdown(dropdownName);
  };

  const handleCartclick = () => {
    setCartDrawer(!cartDrawer);
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
  };

  const iconVariants = {
    hover: { scale: 1.2, transition: { duration: 0.2 } },
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 bg-dark shadow-sm">
        <div className="border-b-[1px] py-5 bg-gray-800 text-white " ref={navbarRef}>
          <div className="container bg-gray-800 text-white mx-auto flex justify-between items-center">
            <div className="flex gap-5 items-center">
              <Link href="/">
                <img
                  src="/white_icon.png"
                  alt="logo"
                  className="h-12 w-16"
                />
              </Link>

              {/* Main Menu */}
              <div className="flex gap-4 text-sm font-thin">
                <button
                  className={`border-b-2 ${
                    activeDropdown === "Shop" ? "border-black" : "border-transparent"
                  } hover:border-black`}
                  onClick={() => toggleDropdown("Shop")}
                >
                  Shop
                </button>
              </div>
            </div>

            {/* Logo */}
            <Link
              href="/"
              className="font-bold tracking-wider uppercase text-2xl absolute left-1/2 transform -translate-x-1/2"
            >
              Sweet Stitch zone
            </Link>

            <div className="flex gap-5">
              <motion.button
                className="cursor-pointer"
                onClick={handleCartclick}
                variants={iconVariants}
                whileHover="hover"
              >
                <FaShoppingBag />
              </motion.button>
            </div>
          </div>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {activeDropdown === "Shop" && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="container mx-auto mt-2"
              >
                <div className="flex gap-10 bg-gray-800 text-white font-thin text-sm">
                  <button
                    onClick={() => toggleDropdown("women")}
                    className={`border-b-2 ${
                      activeDropdown === "women" ? "border-black" : "border-transparent"
                    } hover:border-black`}
                  >
                    Women
                  </button>
                  <button
                    onClick={() => toggleDropdown("men")}
                    className={`border-b-2 ${
                      activeDropdown === "men" ? "border-black" : "border-transparent"
                    } hover:border-black`}
                  >
                    Men
                  </button>
                  <button
                    onClick={() => toggleDropdown("accessories")}
                    className={`border-b-2 ${
                      activeDropdown === "accessories" ? "border-black" : "border-transparent"
                    } hover:border-black`}
                  >
                    Accessories
                  </button>
                  <button
                    onClick={() => toggleDropdown("homeDecor")}
                    className={`border-b-2 ${
                      activeDropdown === "homeDecor" ? "border-black" : "border-transparent"
                    } hover:border-black`}
                  >
                    Home Decor
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Women Dropdown */}
          {activeDropdown === "women" && (
            <div className="absolute left-0 right-0 mt-2 bg-gray-800 border-b-[1px] py-3">
              <div className="container mx-auto text-white">
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/allproducts?take=women-saree"
                      onClick={() => setActiveDropdown(null)}
                      className="text-xs hover:text-blue-300"
                    >
                      Saree
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/allproducts?take=women-blouse"
                      onClick={() => setActiveDropdown(null)}
                      className="text-xs hover:text-blue-300"
                    >
                      Blouse
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Men Dropdown */}
          {activeDropdown === "men" && (
            <div className="absolute left-0 right-0 mt-2 bg-gray-800 border-b-[1px] py-3">
              <div className="container mx-auto text-white text-xs">
                Coming Soon
              </div>
            </div>
          )}

          {/* Accessories Dropdown */}
          {activeDropdown === "accessories" && (
            <div className="absolute left-0 right-0 mt-2 bg-gray-800 border-b-[1px] py-3">
              <div className="container mx-auto text-white">
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/allproducts?take=bag"
                      onClick={() => setActiveDropdown(null)}
                      className="text-xs hover:text-blue-300"
                    >
                      Bag
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/allproducts?take=wallet"
                      onClick={() => setActiveDropdown(null)}
                      className="text-xs hover:text-blue-300"
                    >
                      Wallet
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/allproducts?take=hair-band"
                      onClick={() => setActiveDropdown(null)}
                      className="text-xs hover:text-blue-300"
                    >
                      Hair Band
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Home Decor Dropdown */}
          {activeDropdown === "homeDecor" && (
            <div className="absolute left-0 right-0 mt-2 bg-gray-800 border-b-[1px] py-3">
              <div className="container mx-auto text-white text-xs">
                Coming Soon
              </div>
            </div>
          )}
        </div>
      </div>

      {cartDrawer && (
        <CartDrawer isDrawerOpen={cartDrawer} toggleDrawer={handleCartclick} />
      )}
    </>
  );
}

export default Navbar;