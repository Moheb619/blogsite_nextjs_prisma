import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
export default withAuth({
  pages: {
    signIn: "/Login",
  },
});
// export async function middleware(req: NextRequest) {
//   const token = await getToken({
//     req: req,
//     secret: process.env.NEXTAUTH_SECRET,
//   });
//   if (token) {
//     const url = new URL(`/Dashboard`, req.url);
//     return NextResponse.redirect(url);
//   } else {
//     const url = new URL(`/Login`, req.url);
//     return NextResponse.redirect(url);
//   }
// }

export const config = {
  matcher: ["/Dashboard"],
};
