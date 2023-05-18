import Image from "next/image";
import { FC, useState } from "react";
import { ImMenu } from "react-icons/im";
import LogoHorizontal from "../../assets/icons/logo-horizontal.svg";
import DrawerMenu from "../DrawerMenu/DrawerMenu";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export const Header: FC<any> = ({ handleSingUot, photo }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex justify-between items-center p-2">
      <div className="flex">
        <Image src={LogoHorizontal} alt="Logo" width={109} height={24} />
        <div className="bg-green-300 text-green-800 rounded-xl flex justify-center items-center px-2 ml-2 text-xs">
          Beta 0.1.0
        </div>
      </div>

      <div className="flex items-center p-1" onClick={() => setIsOpen(!isOpen)}>
        <MdOutlineKeyboardArrowDown />
        <Image
          
          src={photo}
          alt="Perfil de usuario"
          width={30}
          height={30}
          className="rounded-full cursor-pointer"
        />
      </div>

      {isOpen && (
        <DrawerMenu
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleSingUot={handleSingUot}
        />
      )}
    </div>
  );
};
