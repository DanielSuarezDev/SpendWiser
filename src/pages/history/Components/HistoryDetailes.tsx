import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../../Config/firebase";
import { ShopCartIcon } from "@/assets/icons";
import { formatCurrency } from "@/utils/formatNumber";
import { BsArrowLeft } from "react-icons/bs";
import Link from "next/link";

interface ICompra {
  id: string;
  fecha: string;
  total: number;
  name?: string;
  items: { id: string; value: string; producto: string; tienda?: string }[];
}

interface HistoryDetailsProps {
  id: string;
}

const HistoryDetails: React.FC<HistoryDetailsProps> = ({ id }) => {
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

  if (!historial) {
    return <p>Cargando...</p>;
  }

  const total = formatCurrency(historial.total);

  return (
    <div className="container mx-auto p-4">
      <Link href="/history" className="flex justify-center items-center mb-5">
        <BsArrowLeft />
        <p className="text-2xl font-bold ml-2">{`Historial ${historial?.name}`}</p>
      </Link>

      <div className="flex justify-between items-center mb-5">
        <p className="text-sm font-medium mb-2 text-green-800">
          Total: {total}
        </p>
        <p className="text-sm font-medium mb-2 text-gray-400">Fecha: {historial.fecha}</p>
      </div>

      <ul className="space-y-2">
        {historial.items.map((item) => {
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
