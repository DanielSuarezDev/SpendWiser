import { useToast } from "@/Contexts/ToastContext";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import BoxRegister from "../../assets/images/box-register.png";
import Divider from "../Divider/Divider";

export const CardTotal: FC<any> = ({
  totalValue,
  productsCount,
  handleHistory,
  products,
  setProducts,
  user,
}) => {
  const [historyName, setHistoryName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { error, success } = useToast();
  const saveHistory = () => {

    if (historyName === "") {
      error("🤔 Ingresa un nombre para el historial");
      return;
    }

    handleHistory(products, user?.uid, setProducts, historyName);
    setHistoryName("");
    setShowModal(false);
    success("👏 Historial guardado");
  };

  return (
    <div className="flex justify-between flex-col lg:flex-row w-80 bg-white rounded-lg p-2 shadow-xl">
      <div className="flex">
        <div className="flex items-center justify-between w-full">
          <div className="flex">
            <Image
              src={BoxRegister}
              alt="Box-register"
              width={45}
              height={35}
              className="mr-2"
            />
            <div>
              <p>Valor Total</p>
              <p>Productos</p>
            </div>
          </div>
          <div>
            <p className="text-green-700">{totalValue}</p>
            <p className="text-gray-700 text-end">{productsCount}</p>
          </div>
        </div>
      </div>
      <Divider />
      <div className="flex justify-between">
        <p
          className="text-gray-500 underline underline-offset-2"
          onClick={() => setShowModal(true)}
        >
          Guardar al historial
        </p>
        <Link
          href="/history"
          passHref
          className="text-blue-500 underline underline-offset-2"
        >
          Ver historial
        </Link>
      </div>

      {showModal && (
        <>
          <div className="fixed inset-0 bg-gray-900 opacity-50 z-9999"></div>

          <div className="fixed inset-0 flex items-center justify-center z-9999">
            <div className="bg-white p-6 rounded-lg shadow-md w-80">
              <h2 className="text-xl mb-4">Guardar historial</h2>
              <input
                type="text"
                value={historyName}
                onChange={(e) => setHistoryName(e.target.value)}
                placeholder="Nombre del historial"
                className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
              />
              <div className="flex justify-end">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  onClick={saveHistory}
                >
                  Guardar
                </button>
              </div>
            </div>
            
          </div>
        </>
      )}
    </div>
  );
};
