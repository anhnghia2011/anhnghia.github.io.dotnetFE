import { useState } from "react";
import OrderManagement from "./OrderManagement";
import ProductManagement from "./ProductManagement";
import UserManagement from "./UserManagement";

const Sidebar = () => {
  const [activeComponent, setActiveComponent] = useState("products");
  const renderComponent = () => {
    switch (activeComponent) {
      case "products":
        return <ProductManagement />;
      case "orders":
        return <OrderManagement />;
      case "users":
        return <UserManagement />;
      default:
        return <ProductManagement />;
    }
  };

  return (
    <div className="flex">
      <div className="w-64 bg-gray-800 text-white h-screen fixed">
        <div className="p-4 text-xl font-bold">Nike Shop</div>
        <ul>
          <li
            className={`p-4 cursor-pointer hover:bg-gray-700 ${
              activeComponent === "products" ? "bg-gray-700" : ""
            }`}
            onClick={() => setActiveComponent("products")}
          >
            Product Management
          </li>
          <li
            className={`p-4 cursor-pointer hover:bg-gray-700 ${
              activeComponent === "orders" ? "bg-gray-700" : ""
            }`}
            onClick={() => setActiveComponent("orders")}
          >
            Order Management
          </li>
          <li
            className={`p-4 cursor-pointer hover:bg-gray-700 ${
              activeComponent === "users" ? "bg-gray-700" : ""
            }`}
            onClick={() => setActiveComponent("users")}
          >
            User Management
          </li>
        </ul>
      </div>

      <div className="ml-64 w-full p-4">{renderComponent()}</div>
    </div>
  );
};

export default Sidebar;
