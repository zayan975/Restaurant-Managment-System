import React, { useState, useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { menus } from "../../constants";
import { CartContext } from "../../context/CartContext";

const MenuContainer = () => {
  const { addItemToCart } = useContext(CartContext);
  const [selectedMenu, setSelectedMenu] = useState(menus[0]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {menus.map((menu) => (
          <div
            key={menu.id}
            className="p-4 rounded bg-gray-800 cursor-pointer hover:bg-gray-700"
            onClick={() => setSelectedMenu(menu)}
          >
            <h1 className="text-white font-bold">{menu.name}</h1>
            <p className="text-gray-400">{menu.items.length} items</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {selectedMenu.items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-gray-900 p-3 rounded"
          >
            <div>
              <h1 className="text-white">{item.name}</h1>
              <p className="text-gray-400">₹{item.price}</p>
            </div>
            <button
              onClick={() => addItemToCart(item)}
              className="text-green-400 hover:text-green-500"
            >
              <FaShoppingCart size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuContainer;
