import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { NextResponse } from "next/server";

interface IParams {
  serviceId?: string;
}

export async function PUT(req: Request, { params }: { params: IParams }) {
  try {
    const { serviceId } = params;
    const body = await req.json();
    const res = await prisma.service.update({
      where: {
        id: serviceId,
      },
      data: {
        title: body.title,
        des: body.des,
      },
    });
    return NextResponse.json(
      {
        status: "success",
        message: "Service Updated Successfully",
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
    const { serviceId } = params;
    const res = await prisma.service.delete({ where: { id: serviceId } });
    return NextResponse.json(
      {
        message: "Service deleted successfully",
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
