"use client";

import React, { useEffect, useState } from "react";
import Button3 from "@/containers/common/Button3/Button3";
import ProductDetailFooter from "../ProductDetailFooter/ProductDetailFooter";
import { X } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import SliderComponent from "@/containers/common/SliderProductPage/SliderComponent"; // ✅ added

const CartDrawer = dynamic(() => import("@/containers/common/CartDrawer/CartDrawer"), {
  ssr: false,
});

function ProductDetailspage({ id }) {
  const [data, setData] = useState(null);
  const [cartDrawer, setCartDrawer] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCartclick = () => {
    setCartDrawer(!cartDrawer);
  };

  /* ---------------- FETCH PRODUCT ---------------- */
  useEffect(() => {
    if (!id) return;

    fetch(`https://sweetstitchesbackend.onrender.com/product/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch product");
        return res.json();
      })
      .then((product) => setData(product))
      .catch((err) => console.error(err));
  }, [id]);

  /* ---------------- IMAGE OBSERVER (DESKTOP ONLY) ---------------- */
  useEffect(() => {
    const imageElements = document.querySelectorAll(".middle-image");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveIndex(Number(entry.target.dataset.index));
          }
        });
      },
      { threshold: 0.5 }
    );

    imageElements.forEach((el) => observer.observe(el));
    return () => imageElements.forEach((el) => observer.unobserve(el));
  }, [data]);

  /* ---------------- QUANTITY ---------------- */
  const increment = () => setQuantity((prev) => Number(prev) + 1);

  const decrement = () => {
    setQuantity((prev) => (prev <= 1 ? 1 : Number(prev) - 1));
  };

  const handleChange = (e) => {
    const val = e.target.value;

    if (val === "") {
      setQuantity("");
      return;
    }

    if (!isNaN(val)) {
      setQuantity(Number(val));
    }
  };

  const handleBlur = () => {
    if (!quantity || quantity < 1) {
      setQuantity(1);
    }
  };

  /* ---------------- ADD TO CART ---------------- */
  const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find((p) => p._id === item._id);

    if (exists) {
      exists.quantity += quantity;
    } else {
      cart.push({
        ...item,
        quantity: quantity,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    setQuantity(1);
    handleCartclick();
  };

  /* ---------------- MODAL ---------------- */
  const openModal = (image) => setSelectedImage(image);
  const closeModal = () => setSelectedImage(null);

  if (!data) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="container mx-auto -mt-20 lg:mt-24 mb-10">
      <div className="grid grid-cols-6 lg:grid-cols-12 lg:gap-4 pt-5">

        {/* ---------------- LEFT THUMBNAILS (DESKTOP) ---------------- */}
        <div className="hidden lg:block col-span-1 sticky top-20">
          {data.images?.map((img, i) => (
            <Image
              key={i}
              src={img}
              alt={`${data?.name || "Product"} thumbnail ${i + 1}`}
              width={64}
              height={80}
              loading="lazy"
              className={`h-20 w-16 cursor-pointer mb-2 ${
                activeIndex === i ? "border-2 border-blue-500" : ""
              }`}
              onClick={() =>
                document
                  .querySelector(`.middle-image[data-index="${i}"]`)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            />
          ))}
        </div>

        {/* ---------------- MAIN IMAGES (DESKTOP) ---------------- */}
        <div className="hidden lg:block col-span-6 px-2">
          {data.images?.map((img, i) => (
            <Image
              key={i}
              src={img}
              alt={`${data?.name || "Product"} image ${i + 1}`}
              width={1200}
              height={1500}
              loading={i === 0 ? "eager" : "lazy"}
              sizes="(max-width: 1024px) 100vw, 50vw"
              data-index={i}
              className="w-full mb-4 cursor-pointer middle-image"
              onClick={() => openModal(img)}
            />
          ))}
        </div>

        {/* ---------------- MOBILE IMAGES (FIXED 🔥) ---------------- */}
        <div className="col-span-6 lg:hidden px-2">
          <SliderComponent images={data.images} />
        </div>

        {/* ---------------- PRODUCT INFO ---------------- */}
        <div className="col-span-6 lg:col-span-5 px-2">
          <h2 className="text-2xl uppercase tracking-widest text-gray-700">
            {data.name}
          </h2>

          <p className="pt-5 text-gray-500 tracking-wider">
            {data.askingPrice - (data.askingPrice * data.discount / 100)} TAKA
          </p>

          <hr className="my-6" />

          <p className="text-xl tracking-widest mb-3">DESCRIPTION</p>
          <p className="text-sm text-gray-700">{data.description}</p>

          <hr className="my-6" />

          QUANTITY
          <div className="flex items-center max-w-[8rem] border rounded-sm">
            <button onClick={decrement} className="p-3 h-11">
              −
            </button>

            <input
              type="text"
              value={quantity}
              onChange={handleChange}
              onBlur={handleBlur}
              className="h-11 w-full text-center outline-none"
            />

            <button onClick={increment} className="p-3 h-11">
              +
            </button>
          </div>

          <div className="mt-6" onClick={() => addToCart(data)}>
            <Button3
              text="ADD TO CART"
              backgroundColor="#be834f"
              borderColor="#be834f"
              textColor="#fff"
            />
          </div>

          {cartDrawer && (
            <CartDrawer
              isDrawerOpen={cartDrawer}
              toggleDrawer={handleCartclick}
            />
          )}
        </div>
      </div>

      <hr className="mt-16" />
      <ProductDetailFooter />

      {/* ---------------- IMAGE MODAL ---------------- */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <button className="absolute top-4 right-4">
            <X className="text-white" />
          </button>
          <Image
            src={selectedImage}
            alt={`${data?.name || "Product"} zoomed`}
            width={1200}
            height={1500}
            sizes="100vw"
            className="max-w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

export default ProductDetailspage;
