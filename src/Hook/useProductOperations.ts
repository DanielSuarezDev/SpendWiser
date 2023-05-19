import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/Config/firebase";

export interface IData {
  id: string;
  value: string;
  description: string;
  tienda?: string;
  fecha: string;
}

const useProductOperations = (setProducts: React.Dispatch<React.SetStateAction<IData[]>>) => {
  const deleteProduct = async (productId: string) => {
    try {
      const productRef = doc(db, "products", productId);
      await deleteDoc(productRef);
      setProducts((prevState: IData[]) =>
        prevState.filter((item) => item.id !== productId)
      );
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  return { deleteProduct };
};

export default useProductOperations;
