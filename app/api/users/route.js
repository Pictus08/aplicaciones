// app/api/users/route.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.users.findMany();
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request) {
  try {
    const { name, email } = await request.json();

    // Validar los datos de entrada
    if (!name || !email) {
      return new Response(
        JSON.stringify({ error: "Name and email are required" }),
        { status: 400 }
      );
    }

    const user = await prisma.users.create({
      data: {
        name,
        email,
      },
    });
    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(JSON.stringify({ error: "Failed to create user" }), {
      status: 400,
    });
  } finally {
    await prisma.$disconnect();
  }
}
