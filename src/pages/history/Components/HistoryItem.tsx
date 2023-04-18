import Link from "next/link";
import { FcMoneyTransfer } from "react-icons/fc";
import { HiChevronRight } from "react-icons/hi";
import { formatCurrency } from "@/utils/formatNumber";
import { toast } from "react-toastify";

interface IHistoryItemProps {
  compra: any;
}

const HistoryItem: React.FC<IHistoryItemProps> = ({ compra }) => {

  const total = formatCurrency(compra.total);
  return (
    <div className="rounded-lg p-2 w-full h-full bg-white shadow-lg mb-3">
      <Link href={`/history/${compra.id}`} passHref>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <FcMoneyTransfer size={30} />
            <div className="ml-4">
              <h3 className="text-gray-700 font-bold text-lg capitalize">
                {compra.name}
              </h3>
              <p className="text-green-800 text-sm -mt-1">{total}</p>
            </div>
          </div>
          <HiChevronRight size={20} />
        </div>
      </Link>
    </div>
  );
};

export default HistoryItem;
