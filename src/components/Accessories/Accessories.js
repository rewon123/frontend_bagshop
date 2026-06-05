"use client";

import Button2 from "@/containers/common/Button2/Button2";
import euroCountries from "@/Data/Countries";
import { accessories } from "@/Data/ProductData";
import { SettingsContext } from "@/hooks/SettingsProvider";
import Link from "next/link";
import Image from "next/image";
import React, { useContext, useState } from "react";

function Accessories({ products, settings }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const prdata = products;

  return (
    <div className="px-6 py-8 container mx-auto mt-20">
      <h2 className="text-2xl font-thin mb-6"> </h2>
      <div className="container mx-auto">
        {/* Added w-full to the grid wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center w-full">
          {prdata.map((product, index) => {
            return (
              <Link
                href={{
                  pathname: `/singleproduct`,
                  query: { id: product._id },
                }}
                key={index}
                /* FIX 1: Changed md:w-72 to w-full md:max-w-72 to prevent squishing on mobile */
                className="w-full max-w-[20rem] md:w-72 p-6 flex flex-col"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* FIX 2: Wrapped in an aspect-square container so Next.js 'fill' scales perfectly */}
                <div className="relative w-full aspect-square overflow-hidden rounded-t-md">
                  <Image
                    src={product.images[0]}
                    alt={product?.name || "Product image"}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    className={`object-cover transition-opacity duration-500 ${
                      hoveredIndex === index ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  {product.images?.[1] && (
                    <Image
                      src={product.images[1]}
                      alt={`${product?.name || "Product"} hover`}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                      className={`absolute top-0 left-0 object-cover transition-opacity duration-500 ${
                        hoveredIndex === index ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  )}
                </div>

                <div className="mt-1">
                  <div className="flex justify-between items-center py-1">
                    <h1 className="text-xs font-thin text-gray-700">
                      {product.name}
                    </h1>
                    <p className="text-xs">
                      <span>
                        BDT {Math.round(product.askingPrice)}
                      </span>
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="mt-6 text-center flex justify-center items-center">
        <Link href="./allproducts">
          <Button2 text="See More" />
        </Link>
      </div>
    </div>
  );
}

export default Accessories;