import { useEffect } from "react";
import { useAuth } from "../../../Contexts/AuthContext";
import {
  collection,
  query,
  where,
  getDocs,
  writeBatch,
  doc,
} from "firebase/firestore";
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

const fetchData = async (uid: string | undefined, setProducts: Function) => {
  const q = query(
    collection(db, "productos"),
    where("userId", "==", uid || "")
  );
  const querySnapshot = await getDocs(q);

  const fetchedData: IData[] = [];
  querySnapshot.forEach((doc) => {
    fetchedData.push({ id: doc.id, ...doc.data() } as IData);
  });
  setProducts(fetchedData);
};

const groupProductsByDate = (products: IData[]): ProductsByDate => {
  return products.reduce<ProductsByDate>((acc, item: IData) => {
    const date = item.fecha
      ? item.fecha.slice(0, 10)
      : new Date().toISOString().slice(0, 10);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});
};

const createHistoryDocuments = (
  productsByDate: ProductsByDate,
  uid: string | undefined
) => {
  return Object.entries(productsByDate).map(([date, items]: [string, IData[]]) => {
    return {
      fecha: date,
      total: items.reduce((acc, item) => acc + parseFloat(item.valor), 0),
      items: items.map((item) => ({
        id: item.id,
        producto: item.descripcion,
        valor: item.valor,
        tienda: item.tienda || null,
      })),
      userId: uid,
    };
  });
};

const moveDataToHistory = async (
  products: IData[],
  uid: string | undefined,
  setProducts: Function
) => {
  const batch = writeBatch(db);
  const productosRef = collection(db, "productos");
  const historialRef = collection(db, "historial");

  const productsByDate = groupProductsByDate(products);
  const historyDocuments = createHistoryDocuments(productsByDate, uid);

  historyDocuments.forEach((historialDoc) => {
    // Eliminar todos los productos de la colección de productos y agregar el documento de historial
    productsByDate[historialDoc.fecha].forEach((item) => {
      const productoRef = doc(productosRef, item.id);
      batch.delete(productoRef);
    });

    const newHistorialDocRef = doc(historialRef);
    batch.set(newHistorialDocRef, historialDoc);
  });

  try {
    await batch.commit();
    setProducts([]);
  } catch (error) {
    console.error("Error moving data to history", error);
  }
};


const MyDataPage: React.FC<any> = ({ products, setProducts }) => {
  const { user } = useAuth();

  useEffect(() => {
    fetchData(user?.uid, setProducts);
  }, [user?.uid]);

  return (
    <div className="container mx-auto p-4 mb-96">
            <h1 className="text-2xl font-bold mb-4">Lista</h1>
      {products.length === 0 ? (
        <p className="text-lg">No se encontraron datos</p>
      ) : (
        <div>
          <ul className="space-y-2">
            {products.map((item: IData) => (
              <li key={item.id} className="border rounded-lg p-3">
                <h2 className="text-lg font-medium mb-2">{item.descripcion}</h2>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">{`$${item.valor}`}</p>
                  {item.tienda && (
                    <p className="text-sm text-gray-600">{`Tienda: ${item.tienda}`}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg mt-4"
            onClick={() => moveDataToHistory(products, user?.uid, setProducts)}
          >
            Mover a historial
          </button>
        </div>
      )}
    </div>
  );
};

export default MyDataPage;
