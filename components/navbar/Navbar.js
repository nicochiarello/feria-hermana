import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Navbar = ({ section }) => {
  const [opened, setOpened] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setOpened(false);
  }, [router]);
  return (
    <nav
      className={`w-full text-white ${
        opened ? "h-screen absolute top-0 z-50" : "h-[4rem]"
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
          <Link
            href={"/dashboard/productos?page=1"}
            className="w-full py-4 px-3"
          >
            <p>Productos</p>
          </Link>
          <Link href={"/dashboard/ventas?page=1"} className="w-full py-4 px-3">
            <p>Ventas</p>
          </Link>
          <Link href={"/dashboard/categorias"} className="w-full py-4 px-3">
            <p>Categorias</p>
          </Link>
          <Link href={"/dashboard/retiros"} className="w-full py-4 px-3">
            <p>Retiros</p>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
