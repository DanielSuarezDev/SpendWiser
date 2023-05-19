import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";

import { db } from "@/Config/firebase";

interface ICompra {
  id: string;
  fecha: string;
  total: number;
  name?: string;
  items: { id: string; value: string; producto: string; tienda?: string }[];
}

export const usePurchaseHistoryDetail = (id: string) => {
  const [historial, setHistorial] = useState<ICompra | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const docRef = doc(db, "history", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setHistorial(docSnap.data() as ICompra);
        } else {
          console.error(`Historial con id ${id} no encontrado`);
          router.push("/history");
        }
      } catch (error) {
        console.error("Error obteniendo historial", error);
      }
    };

    fetchHistorial();
  }, [id, router]);

  return historial;
};
