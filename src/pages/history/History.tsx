import { format } from "date-fns";
import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";

import { db } from "../../Config/firebase";
import { useAuth } from "../../Contexts/AuthContext";
import HistoryItem from "./Components/HistoryItem";
import { BsArrowLeft } from "react-icons/bs";
import Link from "next/link";

interface ICompra {
  id: string;
  fecha: string;
  total: number;
  name?: string;
  productos: { id: string; value: string; producto: string; tienda?: string }[];
}

const History: React.FC = () => {
  const { user } = useAuth();
  const [compras, setCompras] = useState<ICompra[]>([]);

  useEffect(() => {
    const fetchCompras = async () => {
      const q = query(
        collection(db, "history"),
        where("userId", "==", user?.uid)
      );
      const querySnapshot = await getDocs(q);
      const fetchedCompras: ICompra[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedCompras.push({
          id: doc.id,
          name: data.name,
          fecha: format(new Date(data.fecha), "dd 'de' MMMM 'de' yyyy"),
          total: data?.total,
          productos: data.productos,
        });
      });

      setCompras(fetchedCompras);
    };

    if (user?.uid) {
      fetchCompras();
    }
  }, [user?.uid]);

  const groupComprasByDate = (compras: ICompra[]) => {
    const groupedCompras: { [date: string]: ICompra[] } = {};

    compras.forEach((compra) => {
      const date = compra.fecha.slice(0, 10);
      if (!groupedCompras[date]) {
        groupedCompras[date] = [];
      }
      groupedCompras[date].push(compra);
    });

    return groupedCompras;
  };

  const getTotalByDate = (compras: ICompra[]): string => {
    const total = compras.reduce((acc, compra) => acc + compra?.total, 0);
    return total.toLocaleString("en-US");
  };

  const groupedCompras = groupComprasByDate(compras);

  return (
    <div className="flex flex-col p-2 h-full">
      <Link href="/" passHref className="flex justify-center items-center">
        <BsArrowLeft />
        <h1 className="text-xl my-4 ml-2">Historial de compras</h1>
      </Link>

      {Object.entries(groupedCompras).map(([date, compras]) => {
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
