import { cookies } from "next/headers"
import { NextResponse } from "next/server";

export default async function middleware(request) {
	const cookieStore = await cookies();

	if (!cookieStore.has("sh_token")) 
        return NextResponse.redirect(new URL("/login", request.url));

 return NextResponse.next();
}

export const config = {
	matcher: ["/profile/:path*"]
}