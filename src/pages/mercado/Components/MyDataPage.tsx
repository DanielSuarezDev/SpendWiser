import { useState, useEffect } from "react";
import { useAuth } from "../../../Contexts/AuthContext";
import { collection, query, where, getDocs, addDoc, writeBatch, doc } from "firebase/firestore";
import { db } from "../../../Config/firebase";

interface IData {
  id: string;
  valor: string;
  descripcion: string;
  tienda?: string;
  fecha: string;
}

interface ProductsByDate {
  [date: string]: IData[];
}


const MyDataPage: React.FC = () => {
  const { user } = useAuth();
  const [data, setData] = useState<IData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(
        collection(db, "productos"),
        where("userId", "==", user?.uid || "")
      );
      const querySnapshot = await getDocs(q);

      const fetchedData: IData[] = [];
      querySnapshot.forEach((doc) => {
        fetchedData.push({ id: doc.id, ...doc.data() } as IData);
      });
      setData(fetchedData);
    };

    fetchData();
  }, [user?.uid]);
  

  const historial = {
    fecha: new Date().toISOString(),
    total: data.reduce((acc, item) => acc + parseFloat(item.valor), 0),
    items: data.map((item) => ({
      id: item.id,
      producto: item.descripcion,
      valor: item.valor,
      tienda: item.tienda,
    })),
  };

  const moveDataToHistory = async () => {
    const batch = writeBatch(db);
    const productosRef = collection(db, "productos");
    const historialRef = collection(db, "historial");
  
    // Agrupar productos por fecha
    const productsByDate = data.reduce<ProductsByDate>((acc, item) => {
      const date = item.fecha ? item.fecha.slice(0, 10) : new Date().toISOString().slice(0, 10);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});
    
  
    // Crear documentos de historial para cada fecha
    Object.entries(productsByDate).forEach(([date, items]: [string, IData[]]) => {
      const historialDoc = {
        fecha: date,
        total: items.reduce((acc, item) => acc + parseFloat(item.valor), 0),
        items: items.map((item) => ({
          id: item.id,
          producto: item.descripcion,
          valor: item.valor,
          tienda: item.tienda || null,
        })),
        userId: user?.uid,
      };
  
      // Eliminar todos los productos de la colección de productos y agregar el documento de historial
      items.forEach((item) => {
        const productoRef = doc(productosRef, item.id);
        batch.delete(productoRef);
      });
  
      batch.set(doc(historialRef), historialDoc);
    });
  
    try {
      await batch.commit();
      setData([]);
    } catch (error) {
      console.error("Error moving data to history", error);
    }
  };
  
  
  


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mis datos</h1>
      {data.length === 0 ? (
        <p className="text-lg">No se encontraron datos</p>
      ) : (
        <div>
          <ul className="space-y-2">
            {data.map((item) => (
              <li key={item.id} className="border rounded-lg p-4">
                <h2 className="text-lg font-medium mb-2">{item.descripcion}</h2>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">{`$${item.valor}`}</p>
                  {item.tienda && (
                    <p className="text-gray-600">{`Tienda: ${item.tienda}`}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg mt-4"
            onClick={moveDataToHistory}
          >
            Mover a historial
          </button>
        </div>
      )}
    </div>
  );
};

export default MyDataPage;
