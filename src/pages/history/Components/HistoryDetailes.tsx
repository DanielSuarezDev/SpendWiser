import React from 'react';
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

import { ShopCartIcon } from "@/assets/icons";
import { formatCurrency } from "@/utils/formatNumber";
import { usePurchaseHistoryDetail } from '@/Hook/usePurchaseHistoryDetail';

interface HistoryDetailsProps {
  id: string;
}

const HistoryDetails: React.FC<HistoryDetailsProps> = ({ id }) => {
  const historial = usePurchaseHistoryDetail(id);

  if (!historial) {
    return <p>Cargando...</p>;
  }

  const total = formatCurrency(historial.total);

  return (
    <div className="container mx-auto p-4">
      <Link href="/history">
        <div className="flex justify-center items-center mb-5">
          <BsArrowLeft />
          <p className="text-2xl font-bold ml-2">{`Historial ${historial?.name}`}</p>
        </div>
      </Link>

      <div className="flex justify-between items-center mb-5">
        <p className="text-sm font-medium mb-2 text-green-800">
          Total: {total}
        </p>
        <p className="text-sm font-medium mb-2 text-gray-400">Fecha: {historial.fecha}</p>
      </div>

      <ul className="space-y-2">
        {historial.items.map((item: any) => {
          const value = formatCurrency(item.value);

          return (
            <div key={item.id} className="mb-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <ShopCartIcon />
                  <div className="flex flex-col ml-2">
                    <h3 className="text-gray-700 font-bold text-lg capitalize">
                      {item.producto}
                    </h3>
                    <p className="text-green-800 text-sm">{value}</p>
                  </div>
                </div>
              </div>
            </div>
            );
        })}
      </ul>
    </div>
  );
};

export default HistoryDetails;
