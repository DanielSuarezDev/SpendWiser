import React from "react";
import Link from "next/link";
import Image from "next/image";

import { Header } from "@/Components/Header/Header";

import { auth } from "@/Config/firebase";
import { Item } from "@/Components/Item/Item";
import BoxImage from "@/assets/images/box.png";
import { useAuth } from "@/Contexts/AuthContext";
import HeroImage from "@/assets/images/hero.png";
import CheckImage from "@/assets/images/check.png";
import HistoryImage from "@/assets/images/history.png";
import AllToOneImage from "@/assets/images/allToOne.png";
import Head from "next/head";

const options = [
  {
    title: "Registro de compras",
    description:
      "Registra cada producto y su precio mientras compras. No más sorpresas al llegar a casa.",
    image: BoxImage,
    isReverse: false,
  },
  {
    title: "Seguimiento de gastos",
    description:
      "Calcula automáticamente el total de tu compra en tiempo real. Mantén el control de tus finanzas al instante.",
    image: CheckImage,
    isReverse: true,
  },
  {
    title: "Historial detallado",
    description:
      "Accede a un historial completo de tus compras anteriores, con fechas, precios y agrupados. Nunca olvides tus compras ni pierdas de vista los cambios en los precios.",
    image: HistoryImage,
    isReverse: false,
  },
  {
    title: "Todo en uno",
    description: "Todo lo puedes hacer en una sola app y tendras acceso 24/7",
    image: AllToOneImage,
    isReverse: true,
  },
];

export const HomePage = () => {
  const { user } = useAuth();

  const handleSingUot = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out", error);
    }
  };
  return (
    <div>
      <Head>
        <title>Gasta más Inteligentemente con SpendWiser</title> 
        <meta
          name="description"
          content="¡SpendWiser es tu compañero confiable para hacer compras inteligentes y transparentes! Regístrate y dile adiós a las dudas en tus compras. 🛍️"
        />
      </Head>
      <Header
        handleSingUot={handleSingUot}
        photo={user?.photoURL}
        user={user}
      />
      <div className="p-4 flex flex-col justify-center items-center">
        <div className="flex flex-col sm:flex-row justify-center items-center mt-14">
          <div className="text-center sm:w-2/5">
            <h3 className="text-2xl text-gray-600 font-bold">Gasta más</h3>
            <h3 className="text-white">
              <span className="bg-green-600 text-2xl p-1 font-bold">
                Inteligentemente
              </span>
            </h3>

            <p className="my-4 text-gray-600">
              ¡Es hora de decir adiós a las dudas en tus compras! Con
              SpendWiser, nunca más te quedarás preguntándote cuánto gastaste,
              si los precios han subido o si te cobraron lo correcto.
            </p>
            {user && (
              <div className="relative">
                <Link
                  href="/merk"
                  className="bg-black p-2 text-green-100 rounded-lg relative"
                >
                  <span className="absolute right-0 flex h-3 w-3">
                    <span className="animate-ping absolute -right-1 -top-2 inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="inline-flex absolute -right-1 -top-2 rounded-full h-3 w-3 bg-green-400"></span>
                  </span>
                  Entrar a la app
                </Link>
              </div>
            )}
          </div>
          <Image
            src={HeroImage}
            alt="hero"
            className="w-60 h-60 mt-14"
            priority={true}
          />
        </div>

        <div className="text-center mt-14 mb-4">
          <h3 className="text-2xl text-gray-600 font-bold">Nuestra app</h3>
          <h3 className="text-white">
            <span className="bg-green-700 text-2xl p-1 font-bold">
              Revolucionaria
            </span>
          </h3>
          <h3 className="text-2xl text-gray-600 font-bold">te ofrece</h3>
        </div>

        <div>
          {options.map((option, index) => (
            <Item
              key={index}
              title={option.title}
              description={option.description}
              image={option.image}
              isReverse={option.isReverse}
            />
          ))}
        </div>

        <div className="mt-14 flex flex-col justify-center items-center">
          {!user && (
            <Link
              href="/login"
              className="bg-green-300 p-2 text-green-900 rounded-lg"
            >
              Registrate totalmente gratis
            </Link>
          )}
          <p className="mt-6 text-center text-sm text-gray-600">
            ¡SpendWiser es tu compañero confiable para hacer compras
            inteligentes y transparentes! registrate y dile adiós a las dudas en
            tus compras. 🛍️
          </p>
        </div>

        <div className="mt-14">
          <p className="text-xs text-gray-700">
            Desarrollado por{" "}
            <Link
              href="https://www.instagram.com/danielsuarezdev/?hl=es-la"
              className="text-green-800"
            >
              Daniel Suarez Dev
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
