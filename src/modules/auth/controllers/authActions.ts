"use server";

import { UserRepository } from "@/src/repositories/UserRepository";
import { registerSchema, RegisterInput } from "@/src/modules/auth/lib/validation";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";

const userRepository = new UserRepository();

export async function registerUser(data: RegisterInput) {
  const validated = registerSchema.safeParse(data);
  
  if (!validated.success) {
    return { error: "Invalid input data" };
  }

  const { name, email, password, phone } = validated.data;

  try {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      return { error: "Email already in use" };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await userRepository.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    if (error instanceof Prisma.PrismaClientInitializationError) {
      return { error: "Database connection error. Please check DATABASE_URL and try again." };
    }
    return { error: "Something went wrong during registration" };
  }
}
