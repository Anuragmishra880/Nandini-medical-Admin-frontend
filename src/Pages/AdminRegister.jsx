import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../Components/Input";
import Button from "../Components/Button";

const AdminRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    adminName: "",
    email: "",
    adminImage: null,
    password: "",
    cnfPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      adminImage: e.target.files[0],
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.adminName.trim()) newErrors.adminName = "Username required";

    if (!formData.email.includes("@")) newErrors.email = "Valid email required";

    if (!formData.adminImage) newErrors.adminImage = "cover Image is required";

    if (formData.password.length < 6)
      newErrors.password = "Min 6 chars password";

    if (formData.password !== formData.cnfPassword)
      newErrors.cnfPassword = "Passwords not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  try {
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("adminName", formData.adminName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("adminImage", formData.adminImage);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("cnfPassword", formData.cnfPassword);

    const response = await fetch(
     `${import.meta.env.VITE_BASE_URL}/api/v1/admin/register-admin`,
      {
        method: "POST",
        body: formDataToSend,
      }
    );

    const data = await response.json();

    if (response.ok) {
      toast.success("Registered Successfully 😄");
      setFormData({
        adminName: "",
        email: "",
        adminImage: null,
        password: "",
        cnfPassword: "",
      });
      navigate("/login");
    } else {
      toast.error(data.message || "Error occurred");
    }
  } catch (error) {
    toast.error("Server error");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="container mt-5">
      <ToastContainer />
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
            <h3 className="mb-4 text-center text-primary fw-bold">
              Create Account
            </h3>

            {/* AdminName */}
            <div className="mb-3">
              <Input
                type="text"
                label="Full Name"
                name="adminName"
                value={formData.adminName}
                onChange={handleChange}
                className={`form-control ${errors.adminName ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.adminName}</div>
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.email}</div>
            </div>

            {/* coverImage */}

            <div className="mb-3">
              <Input
                type="file"
                name="adminImage"
                label="Cover Image"
                onChange={handleFileChange}
                className={`form-control ${errors.adminImage ? "is-invalid" : ""}`}
                required
              />
              <div className="invalid-feedback">{errors.adminImage}</div>
            </div>

            {/* Password */}
            <div className="mb-3">
              <Input
                type="password"
                name="password"
                label="Password"
                value={formData.password}
                onChange={handleChange}
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.password}</div>
            </div>

            {/* Confirm Password */}
            <div className="mb-3">
              <Input
                type="password"
                name="cnfPassword"
                label="Confirm Password"
                value={formData.cnfPassword}
                onChange={handleChange}
                className={`form-control ${errors.cnfPassword ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.cnfPassword}</div>
            </div>

            {/* Button */}

            <Button
              type="submit"
              className="btn btn-primary w-100 py-2 fw-semibold"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}Add
            </Button>

            {/* Extra link */}
            <p className="text-center mt-3 mb-0">
              Already have an account?
              <NavLink to="/login" className="text-decoration-none">
                Login
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
