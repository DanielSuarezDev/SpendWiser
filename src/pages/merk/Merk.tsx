import React, { FC, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { BsArrowsAngleContract, BsArrowsAngleExpand } from "react-icons/bs";

import { Header } from "@/Components/Header/Header";
import { formatCurrency } from "@/utils/formatNumber";
import FormProducts from "@/Components/Form/FormMerka";
import { CardTotal } from "@/Components/CardTotal/CardTotal";

import MyDataPage from "./Components/MyDataPage";

export const Mercado: FC<any> = ({
  total,
  productCount,
  products,
  setProducts,
  handleHistory,
  handleSingUot,
  user,
}) => {
  const formatTotal = formatCurrency(total);
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  return (
    <div className="flex flex-col h-screen">
      <ToastContainer />
      <div className="fixed top-0 left-0 right-0">
        <Header handleSingUot={handleSingUot} />
        <div className="w-full flex justify-center">
          <CardTotal
            totalValue={formatTotal}
            productsCount={productCount}
            handleHistory={handleHistory}
            products={products}
            setProducts={setProducts}
            user={user}
          />
        </div>
      </div>
      <div className="flex-grow overflow-y-auto pt-40">
        <MyDataPage products={products} setProducts={setProducts} />
      </div>

      <div className="bg-white shadow-md rounded px-8 pt-2 pb-2 bottom-0 w-full border-t-2 border-gray-200">
        {showForm ? (
          <>
            <div
              className="flex justify-between items-center mb-2"
              onClick={toggleForm}
            >
              Ingresar producto
              <BsArrowsAngleContract className="ml-2" />
            </div>
            <FormProducts />
          </>
        ) : (
          <div
            className="flex items-center justify-center mb-2"
            onClick={toggleForm}
          >
            Ingresar producto
            <BsArrowsAngleExpand className="ml-2" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Mercado;
