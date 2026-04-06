'use client'
import ProductDetailspage from "@/components/ProductDetailsPage/ProductDetailspage";
import { useSearchParams } from "next/navigation";
import React from "react";

function ProductDetails() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return (
    <>
      <ProductDetailspage id={id} />
    </>
  );
}
export default ProductDetails;
