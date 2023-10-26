"use client";
import { Header } from "@/app/components/Header";
import { IconCalendar, IconHome } from "@/app/components/Icons";
import { SuperTitle } from "@/app/components/SuperTitle";
import { generarTextoFecha } from "@/app/utils/front.global.utils";
import { formatText } from "@/interfaces/FormatReact";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";

function HederListas() {
  const { searchParams } = useAppSelector((state) => state.globalReducer);

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

      <SuperTitle title={"Listas"}>
        <p className="text-base font-medium text-secondary-200 break-words">
          {generarTextoFecha(searchParams.startDate, searchParams.endDate)}{" "}
          <span className="text-secondary-100">
            items
            {/* {data?.cantidad ?? 0} items */}
          </span>
        </p>
      </SuperTitle>
    </>
  );
}

export default HederListas;
