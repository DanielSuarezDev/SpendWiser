import React from 'react';
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

import HistoryItem from "./Components/HistoryItem";
import usePurchaseHistory from '@/Hook/usePurchaseHistory';


const History: React.FC = () => {
  const { comprasGrouped, getTotalByDate } = usePurchaseHistory();

  return (
    <div className="flex flex-col p-2 h-full">
      <Link href="/merk" passHref>
        <div className="flex justify-center items-center">
          <BsArrowLeft />
          <h1 className="text-xl my-4 ml-2">Historial de compras</h1>
        </div>
      </Link>

      {Object.entries(comprasGrouped).map(([date, compras]: [string, any[]]) => {
        return (
          <div key={date}>
            <div className="flex justify-between items-center">
              <p className="font-bold text-gray-700">{date}</p>
              <p className="font-bold text-gray-700">
                {getTotalByDate(compras)}
              </p>
            </div>
            {compras.map((compra) => (
              <HistoryItem key={compra.id} compra={compra} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default History;
