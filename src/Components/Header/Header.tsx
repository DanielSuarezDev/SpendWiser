import Image from "next/image";
import { FC, useState } from "react";
import { ImMenu } from "react-icons/im";
import LogoHorizontal from "../../assets/icons/logo-horizontal.svg";
import DrawerMenu from "../DrawerMenu/DrawerMenu";

export const Header:FC<any> = ({handleSingUot}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex justify-between items-center p-2">
      <div className="flex">
      <Image src={LogoHorizontal} alt="Logo" width={109} height={24} />
      <div className="bg-green-300 text-green-800 rounded-xl flex justify-center items-center px-2 ml-2 text-xs">
        Beta 0.1.0
      </div>
      </div>
      <ImMenu onClick={() => setIsOpen(!isOpen)} />

      {isOpen && <DrawerMenu isOpen={isOpen} setIsOpen={setIsOpen} handleSingUot={handleSingUot}/>}
    </div>
  );
};
