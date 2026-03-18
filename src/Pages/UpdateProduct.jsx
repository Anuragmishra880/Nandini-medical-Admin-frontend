import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Input from "../Components/Input";
import Button from "../Components/Button";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [products, setProducts] = useState({
    productTitle: "",
    productPrice: "",
    productDescription: "",
    category: "",
    productStock: "",
    productImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setProducts((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("productTitle", products.productTitle);
      formData.append("productPrice", products.productPrice);
      formData.append("productStock", products.productStock);
      formData.append("productDescription", products.productDescription);
      formData.append("category", products.category);
      formData.append("productImage", products.productImage);

      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/products/${id}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });
      const result = await res.json();
      console.log("Product updated:", result);
      alert("Product updated successfully!");
      setProducts({
        productTitle: "",
        productPrice: "",
        productStock: "",
        productDescription: "",
        category: "",
        productImage: null,
      });
    } catch (error) {
      console.error("Error updating  product:", error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="container my-4">
        <div className="card shadow-sm border-0">
          <div className="card-header bg-warning text-dark">
            <h5 className="mb-0">Update Product</h5>
          </div>

          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <Input
                  type="text"
                  name="productTitle"
                  label="Product Name"
                  placeholder="Enter product name"
                  value={products.productTitle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <Input
                  type="text"
                  name="productStock"
                  label="Stock"
                  placeholder="Enter stock quantity"
                  value={products.productStock}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <Input
                  type="text"
                  name="productPrice"
                  label="Price"
                  placeholder="Enter product price"
                  value={products.productPrice}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <Input
                  type="text"
                  name="category"
                  label="Category"
                  placeholder="Enter product category"
                  value={products.category}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <Input
                  type="text"
                  name="productDescription"
                  label="Description"
                  placeholder="Enter product description"
                  value={products.productDescription}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <Input
                  type="file"
                  name="productImage"
                  label="Product Image"
                  placeholder="Upload new product photo"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="card-footer d-flex justify-content-end gap-2">
            <Button
              type="button"
              onClick={() => navigate("/products")}
              className="btn btn-outline-secondary"
            >
              ❌ Cancel
            </Button>
            <Button type="submit" className="btn btn-success px-4">
              💾 Save Changes
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default UpdateProduct;
