import Image from "next/image";
import React, { FC } from "react";

interface Props {
  title: string;
  description: string;
  image: any;
  isReverse?: boolean;
}

export const Item: FC<Props> = ({ title, description, image, isReverse }) => {
  return (
    <div className={`flex flex-col sm:flex-${isReverse ? 'row-reverse' : 'row'} justify-center items-center mt-14`}>
      <div className="sm:w-2/5">
        <Image src={image} alt="hero" loading="lazy" width={150} height={50} />
      </div>
      <div className="text-center sm:w-2/5">
        <h3 className="text-lg text-gray-600 font-bold">{title}</h3>

        <p className="mt-4 text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
};
