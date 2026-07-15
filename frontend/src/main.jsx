import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
  <WishlistProvider>

    <App />

    <Toaster
  position="top-right"
  reverseOrder={false}
  toastOptions={{
    duration: 2500,
    style: {
      background: "#ffffff",
      color: "#111827",
      borderRadius: "16px",
      padding: "16px",
      border: "1px solid #E5E7EB",
      boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    },
    success: {
      iconTheme: {
        primary: "#06B6D4",
        secondary: "#ffffff",
      },
    },
  }}
/>

  </WishlistProvider>
</CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);