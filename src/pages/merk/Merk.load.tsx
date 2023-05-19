import { useEffect } from "react";
import { useRouter } from "next/router";

import { useMarket } from "@/Hook/useMarket";

import { useAuth } from "../../Contexts/AuthContext";

import { Merk } from "./Merk";

export const MercadoLoad = () => {
  const { user } = useAuth();
  const router = useRouter();
  const {
    total,
    productCount,
    products,
    setProducts,
    handleHistory,
    handleSingUot,
  } = useMarket();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Merk
      total={total}
      productCount={productCount}
      products={products}
      setProducts={setProducts}
      handleHistory={handleHistory}
      user={user}
      handleSingUot={handleSingUot}
    />
  );
};

export default MercadoLoad;
