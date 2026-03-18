import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const User = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  useEffect(() => {
    try {
      const fetchUserDetails = async () => {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/users`);
        const result = await res.json();
        setUser(result.data);
      };
      fetchUserDetails();
    } catch (error) {
      console.log("Error fetching userCount:", error);
    }
  }, []);
  return (
    <>
      <div className="container mt-5">
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-primary">
            Added User List
            <span className="badge bg-secondary ms-2">{user.length}</span>
          </h2>

          <button
            className="btn btn-outline-dark mb-3"
            onClick={() => navigate(-1 ||'/')}
          >
            Go Back 
          </button>
        </div>

        {/* List Header Row */}
        <div className="list-group mb-2">
          <div className="list-group-item list-group-item-dark d-flex flex-column flex-md-row fw-bold">
            <div className="flex-fill col-md-4">Name</div>
            <div className="flex-fill col-md-2">Email ID</div>
            <div className="flex-fill col-md-2">Role</div>
          </div>
        </div>

        {/* userList */}
        <ul className="list-group shadow-sm">
          {user.map((items) => (
            <li
              key={items._id}
              className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center"
            >
              {/* userName*/}
              <div className="flex-fill col-md-4 mb-2 mb-md-0 fw-semibold">
                {items.userName}
              </div>
              {/* Email id */}
              <div className="flex-fill col-md-4 mb-2 mb-md-0 fw-semibold">
                {items.email}
              </div>

              {/* Role */}
              <div className="flex-fill col-md-4 mb-2 mb-md-0 fw-semibold">
                {items.role}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default User;
