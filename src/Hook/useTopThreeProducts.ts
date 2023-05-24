import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "@/Config/firebase";
import { useAuth } from '@/Contexts/AuthContext';

const useTopThreeProducts = () => {
  const { user } = useAuth();
  const [topThreeProducts, setTopThreeProducts] = useState([]);

  useEffect(() => {
    const fetchHistorial = async () => {
      const historialSnapshot = await getDocs(collection(db, 'history'));

      const allProducts: any = [];

      historialSnapshot.forEach(doc => {
        const data = doc.data();

        // Filtrar los productos por el usuario actual
        if (data.userId === user?.uid) {
          data.items.forEach((item: any) => {
            allProducts.push(item);
          });
        }
      });

      const sortedProducts = allProducts.sort((a: any, b: any) => parseFloat(b.value) - parseFloat(a.value));
      setTopThreeProducts(sortedProducts.slice(0, 3));
    };

    fetchHistorial();
  }, [user?.uid]);

  return { topThreeProducts };
};

export default useTopThreeProducts;
