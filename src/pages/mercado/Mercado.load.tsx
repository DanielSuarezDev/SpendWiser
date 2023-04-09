import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';


import { useAuth } from '../../Contexts/AuthContext';

import { Mercado } from './Mercado'

export const MercadoLoad = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [total, setTotal] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);


  useEffect(() => {
    if (!user) return;

    const db = getFirestore();
    const q = query(collection(db, "productos"), where("userId", "==", user?.uid));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let tempTotal = 0;
      let tempProductCount = 0;
      let tempProducts:any = [];
    
      querySnapshot.forEach((doc) => {
        const productData = doc.data();
        tempProducts.push(productData);
        const amount = parseFloat(productData.valor);
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
  
  
  
  return (
    <Mercado total={total} productCount={productCount} products={products} setProducts={setProducts}/>
  )
}
