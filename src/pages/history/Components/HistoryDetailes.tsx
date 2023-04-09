import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../Config/firebase';

interface ICompra {
  id: string;
  fecha: string;
  total: number;
  items: { id: string; valor: string; producto: string; tienda?: string }[];
}

interface HistoryDetailsProps {
  id: string;
}

const HistoryDetails: React.FC<HistoryDetailsProps> = ({ id }) => {
  const [historial, setHistorial] = useState<ICompra | null>(null);
  console.log('history', historial)
  const router = useRouter();

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const docRef = doc(db, 'history', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setHistorial(docSnap.data() as ICompra);
        } else {
          console.error(`Historial con id ${id} no encontrado`);
          router.push('/history');
        }
      } catch (error) {
        console.error('Error obteniendo historial', error);
      }
    };

    fetchHistorial();
  }, [id, router]);

  if (!historial) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{`Historial del ${historial?.fecha}`}</h1>

      <p className="text-lg font-medium mb-2">Total: ${historial.total}</p>

      <ul className="space-y-2">
        {historial.items.map((item) => (
          <li key={item.id} className="border rounded-lg p-4">
            <h2 className="text-lg font-medium mb-2">{item.producto}</h2>
            <div className="flex justify-between items-center">
              <p className="text-gray-600">{`$${item.valor}`}</p>
              {item.tienda && <p className="text-gray-600">{`Tienda: ${item.tienda}`}</p>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryDetails;
