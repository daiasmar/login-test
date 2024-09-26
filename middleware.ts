import { NextResponse, NextRequest } from "next/server";

export function middleware( req: NextRequest ) {
    const cookie = req.cookies.get('_token');

    if(!cookie && req.nextUrl.pathname !== '/login') {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    if(cookie && req.nextUrl.pathname === '/login') {
        return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/login']
}