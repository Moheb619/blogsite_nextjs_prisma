import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany({});
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
