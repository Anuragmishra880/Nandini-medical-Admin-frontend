import { useState } from "react";
import Input from "../Components/Input";
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState({
    productTitle: "",
    productPrice: "",
    productDescription: "",
    category: "",
    productImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setProducts((prev) => ({
      ...prev,
      [name]: files ? files[0] : value, // file input ke liye files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("productTitle", products.productTitle);
      formData.append("productPrice", products.productPrice);
      formData.append("productDescription", products.productDescription);
      formData.append("category", products.category);
      formData.append("productImage", products.productImage);

      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/products/addProduct`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        },
      );
      const result = await res.json();
     
      alert("Product added successfully!");

      setProducts({
        productTitle: "",
        productPrice: "",
        productDescription: "",
        category: "",
        productImage: null,
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="container my-4">
        <div className="card shadow-sm border-0">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">Add New Product</h5>
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
                  required
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
                  required
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
                  required
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
                  required
                />
              </div>

              <div className="col-md-6">
                <Input
                  type="file"
                  name="productImage"
                  label="Product Image"
                  placeholder="Upload product photo"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* <div className="card-footer text-end">
       <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => navigate(-1)} // -1 means go back to previous page
          >
            ⬅ Go Back
          </button>


      <Button type="submit" className="btn btn-success px-4">
        ➕ Add Product
      </Button>
    </div> */}

          <div className="card-footer d-flex justify-content-between">
            {/* Left side: Go Back */}
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => navigate(-1)}
            >
              ⬅ Go Back
            </button>

            {/* Right side: Add Product */}
            <button type="submit" className="btn btn-success px-4">
              ➕ Add Product
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddProduct;
