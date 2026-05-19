"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

/* ===============================
   CATEGORY CONFIG
================================ */
const categoryMap = {
  Men: [],
  Women: ["Blouse", "Dress", "Saree"],
  Kids: [],
  Accessories: ["Bag", "Hair Band"],
  "Home Decor": [],
};

function AddProduct() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [parentCategory, setParentCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  /* ===============================
     CHECK ADMIN LOGIN
  ================================ */
  useEffect(() => {
    const admin = localStorage.getItem("adminLoggedIn");
    if (admin === "true") {
      setIsAdmin(true);
    }
  }, []);

  /* ===============================
     ADMIN LOGIN
  ================================ */
  const handleAdminLogin = (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    if (username === "admin" && password === "1234") {
      localStorage.setItem("adminLoggedIn", "true");
      setIsAdmin(true);
    } else {
      alert("Wrong admin credentials");
    }
  };

  /* ===============================
     🔥 CLOUDINARY UPLOAD (ENHANCED)
  ================================ */
  const uploadImagesToImgbb = async (files) => {
    const urls = [];

    for (let file of files) {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("upload_preset", "my_uploads"); // must exist in Cloudinary
      formData.append("folder", "products");

      const fileName = file.name
        .split(".")[0]
        .replace(/\s+/g, "-")
        .toLowerCase();

      formData.append("public_id", fileName + "-" + Date.now());

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/drjtx55yw/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      const optimizedUrl = data.secure_url.replace(
        "/upload/",
        "/upload/f_auto,q_auto/"
      );

      urls.push(optimizedUrl);
    }

    return urls;
  };

  /* ===============================
     AUTO UPLOAD FUNCTION
  ================================ */
  const handleImageUpload = async (files) => {
    const urls = await uploadImagesToImgbb(files);
    setImageUrls(urls);
  };

  /* ===============================
     SUBMIT PRODUCT
  ================================ */
  const onSubmit = async (data) => {
    if (!data.category) {
      alert("Please select a sub category before submitting");
      return;
    }

    if (imageUrls.length === 0) {
      alert("Images are still uploading or missing");
      return;
    }

    const payload = {
      name: data.name,
      description: data.description,
      category: data.category,
      askingPrice: Number(data.askingPrice),
      mainPrice: Number(data.mainPrice),
      discount: Number(data.discount),
      images: imageUrls,
    };

    const res = await fetch("https://sweetstitches-backend.vercel.app/addProducts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      alert("Failed to add product");
      return;
    }

    alert("Product added successfully!");
  };

  /* ===============================
     LOGIN SCREEN
  ================================ */
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <form
          onSubmit={handleAdminLogin}
          className="bg-white p-6 rounded-lg shadow-lg w-80"
        >
          <h2 className="text-xl font-bold mb-4 text-center">
            Admin Login
          </h2>

          <input
            name="username"
            placeholder="Username"
            className="w-full border p-2 mb-3"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full border p-2 mb-4"
            required
          />

          <button className="w-full bg-black text-white py-2 rounded">
            Login
          </button>
        </form>
      </div>
    );
  }

  /* ===============================
     ADMIN PRODUCT FORM
  ================================ */

  return (
    <div className="container mx-auto min-h-screen px-4 py-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg"
      >
        <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

        {/* CATEGORY */}
        <select
          className="input mb-3"
          value={parentCategory}
          onChange={(e) => {
            const value = e.target.value;
            setParentCategory(value);
            setValue("category", "");
          }}
        >
          <option value="">Select Category</option>
          {Object.keys(categoryMap).map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        {/* SUBCATEGORY */}
        {parentCategory && categoryMap[parentCategory].length > 0 && (
          <select
            className="input mb-3"
            {...register("category", { required: true })}
          >
            <option value="">Select Sub Category</option>
            {categoryMap[parentCategory].map((sub) => (
              <option key={sub}>{sub}</option>
            ))}
          </select>
        )}

        {/* PRODUCT NAME */}
        <input
          className="w-full border p-2 mb-3"
          placeholder="Product Name"
          {...register("name", { required: true })}
        />

        {/* DESCRIPTION */}
        <textarea
          rows={4}
          className="w-full border p-2 mb-3"
          placeholder="Description"
          {...register("description", { required: true })}
        />

        {/* PRICES */}
        <div className="grid grid-cols-3 gap-3 mb-3">
          <input
            type="number"
            placeholder="Asking Price"
            className="border p-2"
            {...register("askingPrice", { required: true })}
          />

          <input
            type="number"
            placeholder="Main Price"
            value={0}
            className="border p-2"
            {...register("mainPrice", { required: true })}
          />

          <input
            type="number"
            placeholder="Discount"
            className="border p-2"
            {...register("discount", { required: true })}
          />
        </div>

        {/* IMAGES */}
        <input
          type="file"
          multiple
          accept="image/*"
          className="mb-4"
          onChange={(e) => {
            const files = [...e.target.files];
            setImages(files);
            handleImageUpload(files);
          }}
        />

        {/* BUTTON (VISIBLE ONLY AFTER UPLOAD) */}
        {imageUrls.length > 0 && (
          <button className="w-full py-3 bg-orange-500 text-white rounded-lg">
            Add Product
          </button>
        )}
      </form>
    </div>
  );
}

export default AddProduct;