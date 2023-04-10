import { doc, addDoc, collection, writeBatch, deleteDoc } from "firebase/firestore";

import { auth, db } from "../../../Config/firebase";
import { useAuth } from "../../../Contexts/AuthContext";

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
  return Object.entries(productsByDate).map(
    ([date, items]: [string, IData[]]) => {
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
    }
  );
};

const moveDataToHistory = async (
  products: IData[],
  uid: string | undefined,
  setProducts: Function
) => {
  if (!uid) {
    console.error("Error: invalid user ID");
    return;
  }
  const batch = writeBatch(db);
  const productosRef = collection(db, "products");
  const historialRef = collection(db, "history");

  const productsByDate = groupProductsByDate(products);
  const historyDocuments = createHistoryDocuments(productsByDate, uid);

  // Eliminar todos los productos de la colección de productos
  // Eliminar todos los productos de la colección de productos
  products.forEach((item) => {
    console.log("Deleting item with ID:", item.id);
    const productoRef = doc(productosRef, item.id);
    batch.delete(productoRef);
  });

  try {
    // Commit the batch to delete products
    await batch.commit();

    // Add history documents
    for (const historialDoc of historyDocuments) {
      await addDoc(historialRef, historialDoc);
    }

    setProducts([]);
  } catch (error) {
    console.error("Error moving data to history", error);
  }
};

const handleSingUot = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error("Error signing out", error);
  }
};

const deleteProduct = async (productId: string) => {
  try {
    const productRef = doc(db, "products", productId);
    await deleteDoc(productRef);
  } catch (error) {
    console.error("Error deleting product", error);
  }
};

export const MyDataPage: React.FC<any> = ({ products = [], setProducts }) => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto p-4 mb-96">
      <h1 className="text-2xl font-bold mb-4">Lista</h1>
      {products?.length === 0 ? (
        <p className="text-lg">No se encontraron datos</p>
      ) : (
        <div>
          {products.map((item: IData, index: any) => {
            console.log("item.id", item);

            return (
              <ul className="space-y-2" key={index}>
                <li className="border rounded-lg p-3">
                  <h2 className="text-lg font-medium mb-2">
                    {item.descripcion}
                  </h2>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600">{`$${item.valor}`}</p>
                    {item.tienda && (
                      <p className="text-sm text-gray-600">{`Tienda: ${item.tienda}`}</p>
                    )}
                     <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => deleteProduct(item.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              </ul>
            );
          })}
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg mt-4"
            onClick={() => moveDataToHistory(products, user?.uid, setProducts)}
          >
            Mover a historial
          </button>

          <button
            className="bg-red-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg mt-4"
            onClick={handleSingUot}
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default MyDataPage;
