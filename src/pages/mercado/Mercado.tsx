import React, { FC } from "react";
import { ImStatsDots } from "react-icons/im";
import { FaShoppingBag } from "react-icons/fa";

import FormProducts from "@/Components/Form/FormMerka";
import { formatCurrency } from "@/utils/formatNumber";

import MyDataPage from "./Components/MyDataPage";

export const Mercado: FC<any> = ({ total, productCount, products, setProducts }) => {
  const formatTotal = formatCurrency(total);
  return (
    <div>
      <div className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5">
        <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
          <div className="flex-auto p-4">
            <div className="flex flex-wrap">
              <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                  Valor Total
                </h5>
                <span className="text-green-500 font-semibold text-xl text-blueGray-700">
                  {formatTotal}
                </span>
              </div>
              <div className="relative w-auto pl-4 flex-initial">
                <div className="bg-blue-700 text-blue-100 p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-lightBlue-500">
                  <ImStatsDots />
                </div>
              </div>
            </div>
            <p className="text-sm text-blueGray-400 mt-4">
              <span className="text-red-500 mr-2">
                <FaShoppingBag />
                {productCount}{" "}
              </span>
              <span className="whitespace-nowrap"> Total productos </span>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded px-3 pt-6 pb-8 mb-4" h-100="true">
        <MyDataPage products={products} setProducts={setProducts} />
      </div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-1 fixed bottom-0 w-full border-t-2 border-gray-200">
        <FormProducts />
      </div>
    </div>
  );
};


export default Mercado;