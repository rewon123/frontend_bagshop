"use client";

import React, { useEffect, useState } from "react";

function AdminProductList() {
  const [data, setData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // DELETE
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // EDIT
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    askingPrice: "",
    image: "",
  });

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
     FETCH PRODUCTS
  ================================ */
  useEffect(() => {
    if (!isAdmin) return;

    const fetchData = async () => {
      try {
        const res = await fetch("https://sweetstitches-backend.vercel.app/allProducts");
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [isAdmin]);

  /* ===============================
     DELETE
  ================================ */
  const handleDeleteClick = (productId) => {
    setProductToDelete(productId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;

    try {
      const response = await fetch(
        `https://sweetstitches-backend.vercel.app/product/${productToDelete}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Failed to delete");
        return;
      }

      setData((prev) =>
        prev.filter((item) => item._id !== productToDelete)
      );

      setIsModalOpen(false);
      setProductToDelete(null);
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setProductToDelete(null);
  };

  /* ===============================
     EDIT
  ================================ */
  const handleEditClick = (product) => {
    setProductToEdit(product);
    setEditForm({
      name: product.name,
      askingPrice: product.askingPrice,
      image: product.images?.[0] || "",
    });
    setIsEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProduct = async () => {
    try {
      const response = await fetch(
        `https://sweetstitches-backend.vercel.app/product/${productToEdit._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editForm.name,
            askingPrice: Number(editForm.askingPrice),
            images: [editForm.image],
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Update failed");
        return;
      }

      // update UI instantly
      setData((prev) =>
        prev.map((item) =>
          item._id === productToEdit._id
            ? {
                ...item,
                name: editForm.name,
                askingPrice: Number(editForm.askingPrice),
                images: [editForm.image],
              }
            : item
        )
      );

      setIsEditModalOpen(false);
      setProductToEdit(null);
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setProductToEdit(null);
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
     MAIN TABLE
  ================================ */
  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Product ID</th>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item._id} className="bg-white border-b">
                <td className="px-6 py-4">{item._id}</td>

                <td className="px-6 py-4">
                  <img
                    src={item.images?.[0]}
                    className="w-10 h-10 object-cover rounded"
                  />
                </td>

                <td className="px-6 py-4">{item.name}</td>

                <td className="px-6 py-4">
                  ${item.askingPrice?.toFixed(2)}
                </td>

                <td className="px-6 py-4 flex gap-3">
                  <button
                    onClick={() => handleEditClick(item)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteClick(item._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DELETE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="mb-4">Delete this product?</h3>

            <div className="flex gap-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Yes
              </button>

              <button
                onClick={handleCancelDelete}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">
              Edit Product
            </h3>

            <input
              name="name"
              value={editForm.name}
              onChange={handleEditChange}
              placeholder="Name"
              className="w-full border p-2 mb-3"
            />

            <input
              name="askingPrice"
              type="number"
              value={editForm.askingPrice}
              onChange={handleEditChange}
              placeholder="Price"
              className="w-full border p-2 mb-3"
            />

            <input
              name="image"
              value={editForm.image}
              onChange={handleEditChange}
              placeholder="Image URL"
              className="w-full border p-2 mb-4"
            />

            <div className="flex gap-4">
              <button
                onClick={handleUpdateProduct}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Update
              </button>

              <button
                onClick={handleCancelEdit}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProductList;