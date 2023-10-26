import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ListaLayout = ({ children }: Props) => {

  return (
    <>
      {children}
    </>
  );
};

export default ListaLayout;
