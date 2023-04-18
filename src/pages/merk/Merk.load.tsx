import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  doc,
  query,
  where,
  addDoc,
  onSnapshot,
  collection,
  writeBatch,
  getFirestore,
} from "firebase/firestore";

import { auth, db } from "../../Config/firebase";
import { useAuth } from "../../Contexts/AuthContext";

import { Mercado } from "./Merk";

interface IData {
  id: string;
  value: string;
  description: string;
  tienda?: string;
  fecha: string;
}

interface ProductsByDate {
  [date: string]: IData[];
}

export const MercadoLoad = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [total, setTotal] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const db = getFirestore();
    const q = query(
      collection(db, "products"),
      where("userId", "==", user?.uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let tempTotal = 0;
      let tempProductCount = 0;
      let tempProducts: any = [];

      querySnapshot.forEach((doc) => {
        const productData = doc.data();
        const productId = doc.id; // obtiene el id del producto
        tempProducts.push({ ...productData, id: productId }); // agrega el id al objeto del producto
        const amount = parseFloat(productData.value);
        if (!isNaN(amount)) {
          tempTotal += amount;
        }
        tempProductCount++;
      });

      setTotal(tempTotal);
      setProductCount(tempProductCount);
      setProducts(tempProducts);
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

  //

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
    uid: string | undefined,
    historyName: string // Agregue este parámetro
  ) => {
    return Object.entries(productsByDate).map(
      ([date, items]: [string, IData[]]) => {
        return {
          name: historyName, // Agregue este parámetro
          fecha: date,
          total: items.reduce((acc, item) => acc + parseFloat(item.value), 0),
          items: items.map((item) => ({
            id: item.id,
            producto: item.description,
            value: item.value,
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
    setProducts: Function,
    historyName: string // Agregue este parámetro
  ) => {
    if (!uid) {
      console.error("Error: invalid user ID");
      return;
    }
    const batch = writeBatch(db);
    const productosRef = collection(db, "products");
    const historialRef = collection(db, "history");

    const productsByDate = groupProductsByDate(products);
    const historyDocuments = createHistoryDocuments(productsByDate, uid, historyName);

    products.forEach((item) => {
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

  return (
    <Mercado
      total={total}
      productCount={productCount}
      products={products}
      setProducts={setProducts}
      handleHistory={moveDataToHistory}
      user={user}
      handleSingUot={handleSingUot}
    />
  );
};

export default MercadoLoad;
