"use client";
import React, { useState } from "react";
// import { PrecioProducto } from "./page";
import { IconDelete } from "@/app/components/Icons";
import { Price } from "@/interfaces/product.interface";

interface Props {
  price: Price;
  toggle: (producto: Price) => void;
  selected: boolean;
  deletePrice:(price:Price)=>void
}

const PriceItem = ({ price, toggle, selected, deletePrice }: Props) => {
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        toggle(price);
      }}
      className={`flex justify-between gap-x-1 cursor-pointer select-none items-center  pr-4 py-1 rounded-lg  ${
        selected && "bg-primary-100"
      }`}
    >
      <p className="w-full flex justify-between">
        <span className="capitalize">{price.nombre}</span>
        <span>{price.precio}</span>
      </p>
      <button
        onClick={() => {
          selected && deletePrice(price)
        }}
        className={`text-gray-700 ${selected && "text-secondary-200"}`}
      >
        <IconDelete style="h-4 w-4" />
      </button>
    </div>
  );
};

export default PriceItem;
