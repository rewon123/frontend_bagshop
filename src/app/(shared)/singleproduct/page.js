import ProductDetailspage from "@/components/ProductDetailsPage/ProductDetailspage";
import React from "react";

async function getProduct(id) {
  if (!id) return null;

  try {
    const res = await fetch(`https://sweetstitches-backend.vercel.app/product/${id}`, {
      next: { revalidate: 120 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

async function ProductDetails({ searchParams }) {
  const id = searchParams?.id || null;
  const product = await getProduct(id);

  return (
    <>
      <ProductDetailspage id={id} initialData={product} />
    </>
  );
}
export default ProductDetails;
