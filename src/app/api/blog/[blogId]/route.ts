import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { NextResponse } from "next/server";

interface IParams {
  blogId?: string;
}

export async function PUT(req: Request, { params }: { params: IParams }) {
  try {
    const { blogId } = params;
    const body = await req.json();
    const res = await prisma.blog.update({
      where: {
        id: blogId,
      },
      data: {
        title: body.title,
        des: body.des,
      },
    });
    return NextResponse.json(
      {
        status: "success",
        message: "Blog Updated Successfully",
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

export const DELETE = async (request: Request, { params }: { params: IParams }) => {
  try {
    const { blogId } = params;
    const res = await prisma.blog.delete({ where: { id: blogId } });
    return NextResponse.json(
      {
        message: "Blog deleted successfully",
        data: res,
      },
      { status: 200 }
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
};
