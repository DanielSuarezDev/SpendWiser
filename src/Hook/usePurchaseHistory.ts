import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";

import { db } from "@/Config/firebase";
import { useAuth } from "@/Contexts/AuthContext";

interface ICompra {
  id: string;
  fecha: string;
  total: number;
  name?: string;
  productos: { id: string; value: string; producto: string; tienda?: string }[];
}

interface IComprasGrouped {
  [date: string]: ICompra[];
}

const usePurchaseHistory = (): {
  comprasGrouped: IComprasGrouped;
  getTotalByDate: (compras: ICompra[]) => string;
} => {
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
          fecha: data.fecha,
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
    const groupedCompras: IComprasGrouped = {};

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
    return total.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
    });
  };

  const comprasGrouped = groupComprasByDate(compras);

  return { comprasGrouped, getTotalByDate };
};

export default usePurchaseHistory;
