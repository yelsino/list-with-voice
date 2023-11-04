"use client";
import { Header } from "@/app/components/Header";
import { IconApple, IconCalendar, IconHome } from "@/app/components/Icons";
import Link from "next/link";
import React, { useState } from "react";
import PriceItem from "./price-item";
import { useAppSelector } from "@/redux/hooks";
import { Price } from "@/interfaces/product.interface";
import {
  // deletePrice,
  movePrice,
  setPrice,
} from "@/redux/features/productoSlice";
import {
  useDeletePriceMutation,
  useGetPricesQuery,
} from "@/redux/services/productApi";
import { useDispatch } from "react-redux";

function PreciosPage() {
  const { data, isFetching, isLoading } = useGetPricesQuery(null);
  const dispatch = useDispatch();

  const PR = useAppSelector((state) => state.productoReducer);

  const itemToggle = (price: Price) => {
    if (price.id === PR?.price?.id) {
      return dispatch(setPrice(null));
    }
    dispatch(setPrice(price));
  };

  const [deletePrice] = useDeletePriceMutation();
  // const [convertirRecordJson] = useConvertRecordToJsonMutation();

  const eliminarProducto = async (price: Price) => {
    await deletePrice(price.id);
  };

  return (
    <>
      <Header
        childrenLeft={
          <Link href="/" className="text-2xl">
            <IconHome />
          </Link>
        }
        childrenRight={
          <Link href="/filtrar" className="cursor-pointer">
            <IconCalendar />
          </Link>
        }
      />

      <section className="flex flex-col gap-y-2">
        <h2 className="text-3xl my-1 text-secondary-100 font-black flex gap-x-2">
          Precios productos
        </h2>

        {/* <div className=" flex gap-x-3 text-gray-600">
          <button
            onClick={() => movePrice("verduras")}
            className={`px-2 py-1 bg-primary-100 ${
              PR.price && "text-secondary-200"
            }`}
          >
            Verduras
          </button>
          <button
            onClick={() => movePrice("verduras")}
            className={`px-2 py-1 bg-primary-100 ${
              PR.price && "text-secondary-200"
            }`}
          >
            Tuberculos
          </button>
          <button
            onClick={() => movePrice("verduras")}
            className={`px-2 py-1 bg-primary-100 ${
              PR.price && "text-secondary-200"
            }`}
          >
            Frutas
          </button>
        </div> */}

        <div className="text-lg h-[calc(100vh-230px)] overflow-y-scroll  pb-12 sm:h-[calc(100vh-370px)]">
          <div className=" flex flex-col">
            {data?.map((item) => (
              <PriceItem
                key={item.id}
                price={item}
                toggle={itemToggle}
                selected={item.id === PR.price?.id}
                deletePrice={eliminarProducto}
              />
            ))}
          </div>

          {/* <details open>
            <summary className="select-none capitalize text-secondary-100">
              Tuberculos
            </summary>
            <div className=" flex flex-col">
              {data?.filter((p) => p.categoria === "tuberculos")
                .map((item) => (
                  <PriceItem
                    key={item.id}
                    price={item}
                    toggle={itemToggle}
                    selected={item.id === PR.price?.id}
                    deletePrice={eliminarProducto}
                  />
                ))}
            </div>
          </details>
          <details open>
            <summary className="select-none capitalize text-secondary-100">
              Frutas
            </summary>
            <div className=" flex flex-col">
              {data?.filter((p) => p.categoria === "frutas")
                .map((item) => (
                  <PriceItem
                    key={item.id}
                    price={item}
                    toggle={itemToggle}
                    selected={item.id === PR.price?.id}
                    deletePrice={eliminarProducto}
                  />
                ))}
            </div>
          </details> */}
        </div>
      </section>
    </>
  );
}

export default PreciosPage;
