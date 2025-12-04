import React from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import MenuContainer from "../components/menu/MenuContainer";
import { MdRestaurantMenu } from "react-icons/md";
import CustomerInfo from "../components/menu/CustomerInfo";
import CartInfo from "../components/menu/CartInfo";
import Bill from "../components/menu/Bill";

const Menu = () => {
  return (
    <>
      <section className="bg-[#1f1f1f] min-h-[calc(100vh-5rem)] flex flex-col lg:flex-row gap-3 px-2 lg:px-0 py-2">
        {/* left panel */}
        <div className="lg:flex-3 flex-1 min-h-0">
          <div className="flex items-center justify-between px-4 lg:px-10 py-3">
            <div className="flex items-center gap-3 lg:gap-4">
              <BackButton />
              <h1 className="text-[#f5f5f5] text-xl lg:text-2xl font-bold tracking-wider">
                Menu
              </h1>
            </div>

            <div className="flex items-center gap-3 lg:gap-4">
              <div className="flex items-center gap-2 lg:gap-3 cursor-pointer">
                <MdRestaurantMenu className="text-[#f5f5f5] text-3xl lg:text-4xl" />
                <div className="flex flex-col items-start">
                  <h1 className="text-sm lg:text-md text-[#f5f5f5] font-semibold">
                    Customer Name
                  </h1>
                  <p className="text-xs text-[#ababab] font-medium">
                    Table No:2
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="px-2 lg:px-10 pb-4">
            {/* scrollable left panel content */}
            <div className="overflow-auto max-h-[calc(100vh-10rem)]">
              <MenuContainer />
            </div>
          </div>
        </div>

        {/* right panel */}
        <div className="lg:flex-1 flex-1 bg-[#1a1a1a] rounded-lg overflow-y-auto no-scrollbar h-[calc(100vh-5rem)] pt-2 px-2 lg:px-4">
          <CustomerInfo />
          <hr className="border-t-2 text-[#2a2a2a] my-2" />
          <CartInfo />
          <hr className="border-t-2 text-[#2a2a2a] my-2" />
          <Bill />
        </div>
      </section>

      {/* BottomNav */}
      <BottomNav />
    </>
  );
};

export default Menu;
