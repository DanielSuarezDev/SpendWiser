import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { collection, doc, getDoc } from "firebase/firestore";

import { db } from "../../Config/firebase";

import HistoryDetails from "./Components/HistoryDetailes";

const HistoryItemPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [historial, setHistorial] = useState<any>(null);

  useEffect(() => {
    const obtenerHistorial = async () => {
      if (typeof id !== 'string') return;

      try {
        const docRef = doc(db, "history", id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setHistorial({ id: docSnap.id, ...docSnap.data() });
        } else {
          router.push("/history");
        }
      } catch (error) {
        console.error("Error obteniendo historial", error);
      }
    };
    if (id) {
      obtenerHistorial();
    }
  }, [id]);

  if (!historial) {
    return null; // Aquí podrías poner un spinner o algo similar
  }

  return (
    <div className="container mx-auto p-4">
      <HistoryDetails
        id={id as string}
      />
    </div>
  );
};

export default HistoryItemPage;
