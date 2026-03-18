import { useEffect, useState } from "react";
import {  NavLink, useNavigate } from "react-router-dom";
// import DeleteProduct from "./DeleteProduct";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const fetchProducts = async () => {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/products/`);
        const result = await res.json();
        setProducts(result.data);
      };
      fetchProducts();
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  }, []);

  // delete product logics
  const deleteProduct = async (id) => {
    console.log("Deleting id:", id);
    const confirmDelete = window.confirm("Delete this product?");

    if (!confirmDelete) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/products/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      console.log("Status:", res.status);
      const result = await res.json();
 console.log("Response:", result);
      alert(result.message);

      // UI update
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.log("Delete error:", error);
    }
  };
  return (
    <div className="container mt-5">
      {/* Header Section */}
 
<div className="d-flex justify-content-between align-items-center mb-4">
  <h2 className="fw-bold text-primary">
    🛒 Admin Product List
    <span className="badge bg-secondary ms-2">{products.length}</span>
  </h2>

  {/* Buttons Wrapper */}
  <div className="d-flex gap-2">
    <NavLink to="/add-products" className="btn btn-success">
      + Add New Product
    </NavLink>

    <button
      className="btn btn-outline-dark"
      onClick={() => navigate(-1)}
    >
      Go Back
    </button>
  </div>
</div>

      {/* List Header Row */}
      <div className="list-group mb-2">
        <div className="list-group-item list-group-item-dark d-flex flex-column flex-md-row fw-bold">
          <div className="flex-fill col-md-4">Title</div>
          <div className="flex-fill col-md-2">Price</div>
          <div className="flex-fill col-md-6">Actions</div>
        </div>
      </div>

      {/* Product List */}
      <ul className="list-group shadow-sm">
        {products.map((items) => (
          <li
            key={items._id}
            className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center"
          >
            {/* Title */}
            <div className="flex-fill col-md-4 mb-2 mb-md-0 fw-semibold">
              {items.productTitle}
            </div>

            {/* Price */}
            <div className="flex-fill col-md-2 mb-2 mb-md-0 text-muted">
              {`₨ ${items.productPrice}`}
            </div>

            {/* Actions */}
            <div className="flex-fill col-md-6">
              <NavLink
                to={`/admin/view-product/${items._id}`}
                className="btn btn-info btn-sm me-2 mb-2 mb-md-0"
              >
                View
              </NavLink>
              <NavLink
                to={`/admin/edit-product/${items._id}`}
                className="btn btn-warning btn-sm me-2 mb-2 mb-md-0"
              >
                Update
              </NavLink>

              <button
                className="btn btn-danger btn-sm mb-2 mb-md-0"
                onClick={() => deleteProduct(items._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
