import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import CartProvider from "./components/context/CartContext.jsx";
import { Toaster } from "react-hot-toast";
import Shopcart from "./components/Shopcart.jsx";
import CheckOut from "./components/CheckOut.jsx";
import Login from "./components/Auth/Login.jsx";
import Register from "./components/Auth/Register.jsx";
import Dashboard from "./components/Admin/Dashboard.jsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      ,
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/cart/shopcart",
        element: <Shopcart />,
      },
      {
        path: "/cart/checkout",
        element: <CheckOut />,
      },
    ],
  },
  {
    path: "/admin/register",
    element: <Register />,
  },
  {
    path: "/admin/login",
    element: <Login />,
  },
  {
    path: "/admin/dashboard",
    element: <Dashboard />,
  },
]);

createRoot(document.getElementById("root")).render(
  <CartProvider>
    <StrictMode>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router} />
    </StrictMode>
  </CartProvider>,
);
