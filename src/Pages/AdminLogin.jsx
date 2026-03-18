import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginFailure, loginStart, loginSuccess } from "../store/authSlice"
const AdminLogin = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    adminName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.adminName) {
      newErrors.adminName = "Admin-Name not found ";
    }
    if (!formData.email.includes("@")) {
      newErrors.email = "Valid email required";
    }
    if (!formData.password === "" || !formData.password) {
      newErrors.password = "Password is incorrect";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      dispatch(loginStart());
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/login-admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        // localStorage.setItem("token", result.data.accessToken);
        dispatch(loginSuccess(result.data.admin));
        toast.success("Login Successful 🎉");
        setFormData({ email: "", password: "" });
        navigate("/");
      } else {
        toast.error(data.message || "Invalid credentials");
        // navigate("/register");
        dispatch(loginSuccess(result.data.admin));
      }
    } catch (error) {
      toast.error("Server error");
      dispatch(loginFailure(err.message));
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
            <h3 className="mb-4 text-center text-primary fw-bold">Login</h3>

            {/* UserName */}
            <div className="mb-3">
              <label className="form-label">AdminName</label>
              <input
                type="text"
                name="adminName"
                value={formData.adminName}
                onChange={handleChange}
                className={`form-control ${errors.adminName ? "is-not found" : ""}`}
              />
              <div className="invalid-feedback">{errors.adminName}</div>
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.email}</div>
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.password}</div>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="btn btn-primary w-100 py-2 fw-semibold"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Extra link */}
            <p className="text-center mt-3 mb-0">
              Don’t have an account?
              <NavLink to="/register" className="text-decoration-none">
                Register
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
