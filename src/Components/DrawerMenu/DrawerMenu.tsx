import Link from "next/link";
import { FC, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";

const DrawerMenu: FC<any> = ({ isOpen, setIsOpen , handleSingUot}) => {
  return (
    <div className="z-50" style={{ zIndex: 150 }}>
      <button
        className="fixed z-10 inset-0 overflow-hidden bg-black bg-opacity-50"
        aria-hidden="true"
        onClick={() => setIsOpen(!isOpen)}
      />
      <div className="fixed z-20 inset-y-0 right-0 flex flex-col w-64 bg-white shadow-lg p-2">
        <IoMdClose onClick={() => setIsOpen(!isOpen)} />
        <div className="p-6 flex flex-col justify-between items-start h-full">
          <div>
            <Link href="/merk" className="flex mb-4">
              <AiOutlineHome className="text-2xl mr-2" />
              Inicio
            </Link>
            <Link href="/history" className="flex">
              <AiOutlineShoppingCart className="text-2xl mr-2" />
              Historial
            </Link>
          <div className="flex justify-center items-center mt-6" onClick={handleSingUot}>
            <CiLogout className="text-red-500" />
            <p className="ml-3 text-red-500">Cerrar sesion</p>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawerMenu;
