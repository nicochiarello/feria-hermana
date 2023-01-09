import Link from "next/link";
import { useState } from "react";

const Navbar = ({section}) => {
  const [opened, setOpened] = useState();
  return (
    <nav
      className={`w-full text-white ${
        opened ? "h-screen absolute top-0" : "h-[4rem]"
      }  bg-black  `}
    >
      <div className="w-full h-[4rem]  flex items-center justify-between px-3 border-b">
        <h1 className="text-2xl">{section}</h1>
        <p onClick={() => setOpened(!opened)}>
          {opened ? (
            <i className="bx bx-x text-2xl"></i>
          ) : (
            <i className="bx bx-menu text-2xl"></i>
          )}
        </p>
      </div>
      {opened && (
        <div className="flex flex-col gap-3 py-6">
          <Link href={"/productos"} className="w-full py-4 px-3">
            <p>Productos</p>
          </Link>
          <Link href={"/ventas"} className="w-full py-4 px-3">
            <p>Ventas</p>
          </Link>
          <Link href={"/usuarios"} className="w-full py-4 px-3">
            <p>Usuarios</p>
          </Link>
          <Link href={"/categorias"} className="w-full py-4 px-3">
            <p>Categorias</p>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
