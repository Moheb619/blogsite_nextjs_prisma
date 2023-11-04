import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({});
    return NextResponse.json(
      {
        blogs,
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
    const res = await prisma.blog.create({
      data: {
        title: body.title,
        des: body.des,
      },
    });
    return NextResponse.json(
      {
        status: "success",
        message: "Blog Created Successfully",
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
