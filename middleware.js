import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = process.env.SECRET;

export function middleware(req) {
  let jwt = req.cookies.get("feriahermana_key");
  const { origin } = req.nextUrl;
  const url = req.url;

  if (url.includes("/dashboard")) {
    if (!jwt) {
      return NextResponse.redirect(`${origin}/`);
    }

    try {
      jwtVerify(jwt, secret);

      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(`${origin}/`);
    }
  }

  return NextResponse.next();
}
