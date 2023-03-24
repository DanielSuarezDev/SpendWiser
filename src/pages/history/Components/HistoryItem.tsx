import Link from "next/link";

interface IHistoryItemProps {
  id: string;
  date: string;
  total: number;
}

const HistoryItem: React.FC<IHistoryItemProps> = ({ id, date, total }) => {
  return (
    <div className="border border-gray-400 rounded-lg p-4">
      <h2 className="text-lg font-medium mb-2">{`Compra del ${date}`}</h2>
      <p className="text-gray-600">{`Total: $${total}`}</p>
      <Link href={`/history/${id}`} passHref>
        <div className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 cursor-pointer">
          Ver detalles
        </div>
      </Link>
    </div>
  );
};

export default HistoryItem;
