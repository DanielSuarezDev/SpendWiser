import Image from "next/image";
import { FC, useState } from "react";
import LogoHorizontal from "../../assets/icons/logo-horizontal.svg";
import DrawerMenu from "../DrawerMenu/DrawerMenu";
import AvatarDefault from "../../assets/icons/avatarDefault.svg";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useAuth } from "@/Contexts/AuthContext";
import Link from "next/link";

export const Header: FC<any> = ({ handleSingUot, photo, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex justify-between items-center p-2 max-w-4xl m-auto bg-white">
      <div className="flex">
        <Image src={LogoHorizontal} alt="Logo" width={109} height={24} />
        {user && (
          <div className="bg-green-300 text-green-800 rounded-lg flex justify-center items-center px-1 ml-2 text-xs">
            Beta 0.1.0
          </div>
        )}
      </div>

      {user ? (
        <div
          className="flex items-center p-1 relative cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MdOutlineKeyboardArrowDown />
          <Image
            src={photo ? photo : AvatarDefault}
            alt="Perfil de usuario"
            width={30}
            height={30}
            className="rounded-full cursor-pointer"
          />
          {isOpen && (
            <DrawerMenu
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              handleSingUot={handleSingUot}
            />
          )}
        </div>
      ) : (
        <div>
          <Link
            href="/login"
            className="bg-black text-white px-2 py-1 rounded-lg"
          >
            Iniciar sesion
          </Link>

          <Link href="/login" className="text-xs ml-2 text-green-800 underline">Registrarse</Link>
        </div>
      )}
    </div>
  );
};
