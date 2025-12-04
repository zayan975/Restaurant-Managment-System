import React, { useRef, useEffect, useContext } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaNotesMedical } from "react-icons/fa6";
import { CartContext } from "../../context/CartContext";

const CartInfo = () => {
  const { cartData, removeItemFromCart } = useContext(CartContext);
  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [cartData]);

  return (
    <div className="px-2 py-2 sm:px-3 sm:py-3">
      <h1 className="text-lg text-white font-semibold mb-2">Order Details</h1>
      <div className="mt-2 overflow-y-scroll no-scrollbar h-[350px] grid gap-2" ref={scrollRef}>
        {cartData.length === 0 ? (
          <p className="text-[#ababab] flex justify-center items-center h-[350px]">
            Your cart is empty. Start adding items!
          </p>
        ) : (
          cartData.map((item) => (
            <div key={item.id} className="bg-[#1f1f1f] rounded-lg px-3 py-3 hover:shadow-md">
              <div className="flex justify-between items-center">
                <h1 className="text-[#ababab] font-semibold">{item.name}</h1>
                <p className="text-[#ababab] font-semibold">x{item.quantity}</p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="flex gap-2">
                  <RiDeleteBin2Fill
                    onClick={() => removeItemFromCart(item.id)}
                    className="text-[#ababab] cursor-pointer hover:text-red-500"
                    size={18}
                  />
                  <FaNotesMedical className="text-[#ababab]" size={18} />
                </div>
                <p className="text-white font-bold">₹{item.price * item.quantity}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CartInfo;
