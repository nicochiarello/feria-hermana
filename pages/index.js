import { useState } from "react";
import Head from "next/head";
import { PulseLoader } from "react-spinners";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import axios from "axios";

export default function Home() {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });
  const [loader, setLoader] = useState(false);
  const [authError, setAuthError] = useState({});
  const [hiddenPassword, setHiddenPassword] = useState(true);

  const signin = (e) => {
    e.preventDefault();
    setLoader(true);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}/api/users/login`,
        formValues
      )
      .then((res) => {
        setLoader(false);
        const cookies = new Cookies();
        cookies.set("feriahermana_key", res.data.token, {
          path: "/",
        });
        router.push("/productos")
        console.log(res);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err.response.data);
        setAuthError(err.response.data);
      });
  };
  return (
    <>
      <Head>
        <title>Feria Hermana Login</title>
      </Head>
      <div className="w-screen h-screen flex items-center justify-center px-2 bg-btn">
        <div className="px-2 py-4 w-full sm:max-w-full sm:w-fit h-[30rem] sm:h-fit sm:px-16 sm:py-16 bg-white text-black rounded-xl overflow-hidden flex  flex-col gap-10 justify-around">
          <div className="flex flex-col items-center justify-center text-2xl font-bold gap-4 w-full sm:w-[calc(20rem)]">
            <div className="w-[5rem] h-[5rem] bg-btn rounded-full flex items-center justify-center text-white">
              <p>FH</p>
            </div>
            <h2>Feria Hermana</h2>
          </div>
          <form onSubmit={signin} className="flex flex-col gap-5 ">
            <div className="flex flex-col gap-1">
              <label>Email</label>

              <input
                onChange={(e) =>
                  setFormValues({ ...formValues, email: e.target.value })
                }
                value={formValues.email}
                type="text"
                className={`form-control block w-full pl-3 pr-12 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${
                  authError.email && "border border-red-400"
                }`}
                id="exampleFormControlInput1"
                placeholder="Email"
              />
              {authError.email && (
                <span className=" text-red-500 text-sm">{authError.email}</span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label>Contraseña</label>
              <div>
                <div className="h-full relative">
                  <input
                    autoComplete="on"
                    onChange={(e) =>
                      setFormValues({ ...formValues, password: e.target.value })
                    }
                    value={formValues.password}
                    type={hiddenPassword ? "password" : "text"}
                    className={`form-control block w-full pl-3 pr-12 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${
                      authError.password && "border border-red-400"
                    }`}
                    placeholder={hiddenPassword ? "********" : "Contraseña"}
                  />
                  <div
                    className={`absolute text-black top-[50%] translate-y-[-50%] right-2 text-2xl flex items-center h-full px-1  cursor-pointer `}
                    onClick={() => setHiddenPassword(!hiddenPassword)}
                  >
                    {hiddenPassword ? (
                      <i className="bx bx-show  "></i>
                    ) : (
                      <i className="bx bx-hide  "></i>
                    )}
                  </div>
                </div>
              </div>
              {authError.password && (
                <span className=" text-red-600 text-sm">
                  {authError.password}
                </span>
              )}
            </div>
            {loader ? (
              <button
                type="submit"
                className="rounded py-2 my-3 text-center font-bold bg-blue-400 w-full cursor-not-allowed"
              >
                <PulseLoader size={8} color={"#ffffff"} />
              </button>
            ) : (
              <button
                type="submit"
                className="rounded py-2 my-3 text-center font-bold bg-btn text-white w-full "
              >
                Iniciar Sesion
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
