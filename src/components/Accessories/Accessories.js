"use client";

import Button2 from "@/containers/common/Button2/Button2";
import euroCountries from "@/Data/Countries";
import { accessories } from "@/Data/ProductData";
import { SettingsContext } from "@/hooks/SettingsProvider";
import Link from "next/link";
import React, { useContext, useState } from "react";

function Accessories({ products, settings }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const prdata = products;
  console.log(prdata);

  // const { country } = useContext(SettingsContext);

  return (
    <div className="px-6 py-8 container mx-auto mt-20">
      <h2 className="text-2xl font-thin mb-6">
        {" "}
      </h2>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
          {prdata.map((product, index) => {
            // let validUtility = product?.utilities.find(
            //   (utility) => utility?.numberOfProducts > 0
            // );
            // const isSoldOut = !validUtility;
            // if (isSoldOut) {
            //   validUtility = product?.utilities[0];
            // }
            // console.log(validUtility);

            return (
              <Link
              // href={`/singleproduct:${product._id}`}
                href={{
                  pathname: `/singleproduct`,
                  query: { id: product._id },
                }}
                key={index}
                className="md:w-72 p-6"
                // onMouseEnter={() => setHoveredIndex(index)}
                // onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative w-full h-72">
                  <img
                    src={product.images[0]}
                    // alt={validUtility?.productName}
                    className={`w-full h-full object-cover rounded-t-md transition-opacity duration-500 ${
                      hoveredIndex === index ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <img
                    src={product.images[1]}
                    // alt={`${validUtility?.productName} hover`}
                    className={`absolute top-0 left-0 w-full h-full object-cover rounded-t-md transition-opacity duration-500 ${
                      hoveredIndex === index ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>

             

                <div className="mt-1">
                  <div className="flex justify-between items-center py-1">
                    <h1 className="text-xs font-thin text-gray-700">
                      {product.name}
                    </h1>
                    <p className="text-xs">
                        <span>
                          BDT{" "}
                          {Math.round(
                            product.askingPrice 
                          )}
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
        <Link href='./allproducts'
          // href={{
          //   pathname: "/allproducts",
          //   query: {
          //     take: `/${settings?.promote2?.person}/${settings?.promote2?.category}/${settings?.promote2?.subCategory}`,
          //   },
          // }}
        >
          <Button2 text="See More" />
        </Link>
      </div>
    </div>
  );
}

export default Accessories;
