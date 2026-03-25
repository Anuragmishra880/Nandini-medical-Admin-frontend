import { useState } from "react";
import { useEffect } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
export const ViewProduct = () => {
  const navigate = useNavigate();
  const deleteProduct = async (id) => {
  
    const confirmDelete = window.confirm("Delete this product?");

    if (!confirmDelete) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/products/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
    
      const result = await res.json();
      alert(result.message);

      // UI update
      navigate("/products");
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  const { id } = useParams();
  const [productData, setProductData] = useState({});
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/products/${id}`);
        const result = await res.json();

        setProductData(result.data);
      } catch (error) {
        console.log("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);
  return (
    <div className="container mt-4">
      <img
        src={
          productData.productImage?.secure_url || productData.productImage?.url
        }
        alt={productData.productTitle}
        style={{ width: "250px" }}
      />

      <h2>{productData.productTitle}</h2>

      <p>
        <b>Price:</b> ₹{productData.productPrice}
      </p>
      <p>
        <b>Category:</b> {productData.category}
      </p>
      <p>
        <b>Stock:</b> {productData.productStock}
      </p>

      <p>
        <b>Description:</b>
      </p>
      <p>{productData.productDescription}</p>

      <NavLink
        className="btn btn-warning"
        to={`/admin/edit-product/${productData._id}`}
      >
        Update
      </NavLink>
      <button
        className="btn btn-danger ms-2"
        onClick={() => deleteProduct(productData._id)}
      >
        Delete
      </button>
    </div>
  );
};
