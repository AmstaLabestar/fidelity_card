"use server";

import { UserRepository } from "@/src/repositories/UserRepository";
import { registerSchema, RegisterInput } from "@/src/modules/auth/lib/validation";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";
import { headers } from "next/headers";
import { getClientIpFromHeaders, rateLimit } from "@/src/lib/rateLimit";
import { normalizeTrackingParams } from "@/src/lib/tracking";

const userRepository = new UserRepository();

export async function registerUser(data: RegisterInput) {
  const validated = registerSchema.safeParse(data);
  
  if (!validated.success) {
    return { error: "Invalid input data" };
  }

  const { name, email, password, phone, ...trackingInput } = validated.data;

  try {
    const hdrs = await headers();
    const ip = getClientIpFromHeaders(hdrs);
    if (ip) {
      const check = rateLimit(`auth:register:ip:${ip}`, { windowMs: 60 * 60 * 1000, max: 10 });
      if (!check.ok) return { error: "Too many requests. Please try again later." };
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      return { error: "Email already in use" };
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const tracking = normalizeTrackingParams(trackingInput);

    await userRepository.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      phone,
      utmSource: tracking.utm_source,
      utmMedium: tracking.utm_medium,
      utmCampaign: tracking.utm_campaign,
      utmContent: tracking.utm_content,
      utmTerm: tracking.utm_term,
      fbclid: tracking.fbclid,
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
