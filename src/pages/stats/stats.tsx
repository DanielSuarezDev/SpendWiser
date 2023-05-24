import useTopThreeProducts from "@/Hook/useTopThreeProducts";
import Link from "next/link";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Stats = () => {
  const { topThreeProducts } = useTopThreeProducts();

  // Transforma los productos a un formato que Recharts puede utilizar
  const data = topThreeProducts.map((producto: any) => ({
    name: producto.producto,
    value: parseFloat(producto.value),
  }));

  return (
    <div className="flex flex-col justify-center">
      <Link href="/merk" passHref>
        <div className="flex justify-center items-center">
          <BsArrowLeft />
          <h1 className="text-xl my-4 ml-2">Volver</h1>
        </div>
      </Link>

      <div className="mb-4">
        <h1 className="text-2xl font-bold text-center">
          Top 3 productos más caros
        </h1>
        <p className="text-center text-gray-500">
          Los productos más caros que has comprado
        </p>
      </div>

      <BarChart
        width={500}
        height={500}
        data={data}
        margin={{
          top: 25,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" height={400} />
        <XAxis dataKey="name" />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#5bc009" barSize={70} style={{marginTop: 100}}>
          <LabelList
            dataKey="value"
            position="top"
            formatter={(value: string) => `$${value.toLocaleString()}`}
            style={{ marginTop: '10px' }}
          />
        </Bar>
      </BarChart>
    </div>
  );
};


export default Stats;