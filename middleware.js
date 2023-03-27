import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const { cookies, url, nextUrl } = request;
  let pathname = nextUrl.pathname;

  const authCookie = cookies.get(process.env.NEXT_PUBLIC_FH_KEY);

  if (!authCookie && pathname.includes("dashboard")) {
    return NextResponse.redirect(process.env.APP_URI);
  }

  if (authCookie && pathname === "/") {
    return NextResponse.redirect(process.env.APP_URI + "/dashboard/productos");
  }
}
