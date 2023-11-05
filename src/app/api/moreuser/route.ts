import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.moreUser.findMany({});
    return NextResponse.json(
      {
        users,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: "Form er Data Invalid",
      }),
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await prisma.moreUser.create({
      data: {
        fullname: body.fullname,
        email: body.email,
        phone: body.phone,
      },
    });
    return NextResponse.json(
      {
        status: "success",
        message: "User Created Successfully",
        data: res,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error,
      }),
      { status: 500 }
    );
  }
}
