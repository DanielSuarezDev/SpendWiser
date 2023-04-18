import Image from "next/image";
import { FC, useState } from "react";
import { ImMenu } from "react-icons/im";
import LogoHorizontal from "../../assets/icons/logo-horizontal.svg";
import DrawerMenu from "../DrawerMenu/DrawerMenu";

export const Header:FC<any> = ({handleSingUot}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex justify-between items-center p-2">
      <Image src={LogoHorizontal} alt="Logo" width={109} height={24} />
      <ImMenu onClick={() => setIsOpen(!isOpen)} />

      {isOpen && <DrawerMenu isOpen={isOpen} setIsOpen={setIsOpen} handleSingUot={handleSingUot}/>}
    </div>
  );
};
