import { FC } from "react";
import Link from "next/link";
import { BsShop } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";

const DrawerMenu: FC<any> = ({ isOpen, setIsOpen, handleSingUot }) => {
  return (
    <div className="absolute top-10 right-5 flex flex-col w-52 bg-white shadow-xl rounded-lg p-2 z-50">
      <IoMdClose
        onClick={() => setIsOpen(!isOpen)}
        className="absolute right-4"
      />
      <div className="p-6 flex flex-col justify-between items-start h-full">
        <div>
        <Link href="/" className="flex mb-4">
            <AiOutlineHome className="text-2xl mr-2" />
            Home
          </Link>
          <Link href="/merk" className="flex mb-4">
            <BsShop className="text-2xl mr-2" />
            Registrar Compras
          </Link>
          <Link href="/history" className="flex">
            <AiOutlineShoppingCart className="text-2xl mr-2" />
            Historial
          </Link>
          <div
            className="flex justify-center items-center mt-6"
            onClick={handleSingUot}
          >
            <CiLogout className="text-red-500" />
            <p className="ml-3 text-red-500">Cerrar sesion</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawerMenu;
