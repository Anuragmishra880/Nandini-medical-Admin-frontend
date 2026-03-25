import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { getCurrentUser, checkAdmin } from "../store/authAction";

const AdminHome = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [checkedButton, setCheckedButton] = useState(false);
  const [email, setEmail] = useState(""); // 👈 email state add kiya

  const { userExists, admin } = useSelector((state) => state.auth);

  const handleCheck = () => {
    if (email.trim() !== "") {
      dispatch(checkAdmin(email));
      setCheckedButton(true);
    }
  };

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (admin) {
      const fetchProducts = async () => {
        try {
          const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/products/`);
          const result = await res.json();
          setProducts(result.data || []);
        } catch (error) {
          console.log(error);
        }
      };

      const fetchUsers = async () => {
        try {
          const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/users`);
          const result = await res.json();
          setUserCount(result.data?.length || 0);
        } catch (error) {
          console.log(error);
        }
      };

      fetchProducts();
      fetchUsers();
    }
  }, [admin]);

  return (
    <div className="container-fluid p-0">
      {/* Top Navbar */}
      <nav className="navbar navbar-dark bg-dark w-100 p-0">
        <span className="navbar-brand ms-3">Admin Panel</span>
        {admin && (
          <button
            className="btn btn-outline-light d-lg-none me-3"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#sidebarMenu"
            aria-controls="sidebarMenu"
          >
            ☰ Menu
          </button>
        )}
      </nav>

      <div className="row g-0">
        {/* Sidebar for large screens */}
        {admin && (
          <div className="col-lg-2 bg-dark text-white min-vh-100 p-0 d-none d-lg-flex flex-column">
            <ul className="nav flex-column p-3">
              <li className="nav-item mb-2">
                <NavLink to="/" className="nav-link text-white">
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item mb-2">
                <NavLink to="/products" className="nav-link text-white">
                  Products
                </NavLink>
              </li>
              {/* <li className="nav-item mb-2">
                <NavLink to="/orders" className="nav-link text-white">
                  Orders
                </NavLink>
              </li> */}
              <li className="nav-item mb-2">
                <NavLink to="/users" className="nav-link text-white">
                  Users
                </NavLink>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-link nav-link text-white"
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}

        {/* Offcanvas Sidebar for mobile */}
        <div
          className="offcanvas offcanvas-start bg-dark text-white min-vh-100 p-0"
          tabIndex="-1"
          id="sidebarMenu"
          aria-labelledby="sidebarMenuLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="sidebarMenuLabel">
              Admin Menu
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <NavLink to="/admin" className="nav-link text-white">
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item mb-2">
                <NavLink to="/products" className="nav-link text-white">
                  Products
                </NavLink>
              </li>
              <li className="nav-item mb-2">
                <NavLink to="/orders" className="nav-link text-white">
                  Orders
                </NavLink>
              </li>
              <li className="nav-item mb-2">
                <NavLink to="/users" className="nav-link text-white">
                  Users
                </NavLink>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-link nav-link text-white"
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-lg-10 p-4">
          {!admin ? (
            <div className="text-center">
              <h3>Please enter your email to continue</h3>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control w-50 mx-auto my-3"
              />
              {!checkedButton && (
                <button onClick={handleCheck} className="btn btn-dark">
                  Check
                </button>
              )}
              {userExists === null ? null : userExists ? (
                <NavLink to="/login" className="btn btn-primary mt-3">
                  Login
                </NavLink>
              ) : (
                <NavLink to="/register" className="btn btn-success mt-3">
                  Register
                </NavLink>
              )}
            </div>
          ) : (
            <>
              <h2 className="mb-4">Dashboard Overview</h2>

              <div className="row mb-4">
                <div className="col-md-4">
                  <div className="card shadow text-center p-3">
                    <h5>Total Products</h5>
                    <h3>{products.length}</h3>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card shadow text-center p-3">
                    <h5>Total Orders</h5>
                    <h3>0</h3>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card shadow text-center p-3">
                    <h5>Total Users</h5>
                    <h3>{userCount}</h3>
                  </div>
                </div>
              </div>

              <div className="card shadow p-3">
                <h5 className="mb-3">Recent Products</h5>
                <ul className="list-group">
                  {products.map((item) => (
                    <li key={item._id} className="list-group-item">
                      {item.productTitle}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
