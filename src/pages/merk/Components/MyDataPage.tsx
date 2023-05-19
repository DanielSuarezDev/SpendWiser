import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { ShopCartIcon } from "@/assets/icons";
import { formatCurrency } from "@/utils/formatNumber";
import useProductOperations from "@/Hook/useProductOperations";

interface IData {
  id: string;
  value: string;
  description: string;
  tienda?: string;
  fecha: string;
}

export const MyDataPage: React.FC<any> = ({ products = [], setProducts }) => {
  const { deleteProduct } = useProductOperations(setProducts);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);

  const isClient = typeof window !== "undefined";

  return (
    <div className="container mx-auto p-4 mb-96">
      <h2 className="text-1xl font-bold my-4 text-green-800">Lista</h2>
      {isClient && products?.length === 0 ? (
        <p className="text-lg">No se encontraron datos</p>
      ) : (
        <div>
          {products.map((item: IData, index: any) => {
            const value = formatCurrency(item.value);
            return (
              <div key={index} className="mb-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <ShopCartIcon />
                    <div className="flex flex-col ml-2">
                      <h3 className="text-gray-700 font-bold text-lg capitalize">
                        {item.description}
                      </h3>
                      <p className="text-green-800 text-sm">{value}</p>
                    </div>
                  </div>
                  <FaTrashAlt
                    className="text-red-500 hover:text-red-700"
                    onClick={() => {
                      deleteProduct(item.id);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyDataPage;
