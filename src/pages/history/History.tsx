import React, { useState, useEffect } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../Config/firebase";
import HistoryItem from "./Components/HistoryItem";
import Link from "next/link";

interface ICompra {
  id: string;
  fecha: string;
  total: number;
  productos: { id: string; valor: string; producto: string; tienda?: string }[];
}

const History: React.FC = () => {
  const { user } = useAuth();
  const [compras, setCompras] = useState<ICompra[]>([]);
  console.log("compras", compras);
  useEffect(() => {
    const fetchCompras = async () => {
      const q = query(
        collection(db, "history"),
        where("userId", "==", user?.uid || "")
      );
      const querySnapshot = await getDocs(q);

      const fetchedCompras: ICompra[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedCompras.push({ id: doc.id, ...data } as ICompra);
      });
      setCompras(fetchedCompras);
    };

    fetchCompras();
  }, [user?.uid]);

  return (
    <div className="container mx-auto p-4">
      <Link href="/" passHref>
        <div>Volver</div>
      </Link>
      <h1 className="text-2xl font-bold mb-4">Historial de compras</h1>
      {compras.length === 0 ? (
        <p className="text-lg">No se encontraron compras</p>
      ) : (
        <ul className="space-y-4">
          {compras.map((compra) => (
            <li key={compra.id}>
              <HistoryItem
                id={compra.id}
                date={compra.fecha}
                total={compra.total}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
