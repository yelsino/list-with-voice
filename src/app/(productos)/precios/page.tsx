"use client";
import { Header } from "@/app/components/Header";
import { IconCalendar, IconHome } from "@/app/components/Icons";
import { Price } from "@/interfaces/product.interface";
import {
  setPrice,
} from "@/redux/features/productoSlice";
import { useAppSelector } from "@/redux/hooks";
import {
  useDeletePriceMutation,
  useGetPricesQuery,
} from "@/redux/services/productApi";
import Link from "next/link";
import { useDispatch } from "react-redux";
import PriceItem from "./price-item";

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

        </div>
      </section>
    </>
  );
}

export default PreciosPage;
