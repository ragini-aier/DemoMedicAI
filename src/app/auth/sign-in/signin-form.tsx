"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

// Validation schema
const SignInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInValues = z.infer<typeof SignInSchema>;

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [globalMessage, setGlobalMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isDirty },
    reset,
  } = useForm<SignInValues>({
    resolver: zodResolver(SignInSchema),
    mode: "onChange",
  });

  async function onSubmit(values: SignInValues) {
    // Demo feedback – replace with real auth call
    try {
      setGlobalMessage(null);
      await new Promise((r) => setTimeout(r, 700));
      // Fake invalid credentials example
      setGlobalMessage("Invalid email or password. Please try again.");
      reset({ email: values.email, password: "" });
    } catch {
      setGlobalMessage("Something went wrong. Please try again later.");
    }
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen w-full bg-white text-dark"
    >
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* Left visual panel */}
        <section
          className="relative hidden items-center justify-center overflow-hidden lg:flex"
          aria-label="MedicAI marketing panel"
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src="/images/cover/medicai_left.jpg"
              alt=""
              fill
              priority
              className="object-cover object-center blur-sm"
            />
          </div>
          {/* White overlay (adjust opacity to taste) */}
          <div className="absolute inset-0 bg-[#A7D1E2D9]" />
          <div className="relative z-10 mx-10 max-w-xl">
            <h1 className="text-3xl font-semibold text-dark sm:text-4xl md:text-5xl">
              AI That Cares for You
            </h1>
            <p className="mt-5 text-dark">
              medicAI provides instant, personalized health guidance to help you
              stay informed, track your wellness, and manage your care—all from
              the comfort of your device.
            </p>
          </div>
        </section>

        {/* Right form panel */}
        <section className="flex w-full items-center justify-center px-6 py-10 sm:px-10">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="mb-8">
              <Image
                src="/images/logo/logo%20copy.svg"
                alt="MedicAI logo"
                width={150}
                height={50}
                priority
              />
            </div>

            <h2 className="text-2xl font-semibold text-dark">Welcome Back</h2>
            <p className="mt-1 text-sm text-dark-6">Sign in to continue</p>

            {globalMessage && (
              <div
                role="status"
                className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {globalMessage}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              {/* Email */}
              <div>
                <label htmlFor="email" className="text-sm font-medium text-dark">
                  Email Address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className="w-full rounded-lg border border-stroke px-4 py-3 text-dark placeholder:text-dark-6 outline-none transition focus:border-primary"
                    placeholder="Enter Email Address"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p id="email-error" className="mt-1 text-xs text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium text-dark">
                    Password
                  </label>
                  <Link href="#" className="text-xs text-[#7CD2CF] hover:opacity-90">
                    Forgot Password?
                  </Link>
                </div>
                <div className="mt-2 relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    className="w-full rounded-lg border border-stroke px-4 pr-11 py-3 text-dark placeholder:text-dark-6 outline-none transition focus:border-primary"
                    placeholder="Enter your password"
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? "password-error" : undefined}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-5 hover:text-dark"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p id="password-error" className="mt-1 text-xs text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!isValid || !isDirty || isSubmitting}
                 className="flex w-full items-center justify-center rounded-lg bg-[#A7D1E2D9] px-4 py-3 font-medium text-white transition enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Signing In..." : "Login"}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-stroke" />
                <span className="text-xs text-dark-6">or</span>
                <div className="h-px flex-1 bg-stroke" />
              </div>

              {/* Footer */}
              <p className="text-center text-sm text-dark-6">
                Don&apos;t have an account?{" "}
                <Link href="#" className="text-[#A7D1E2D9] hover:opacity-90">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </section>
      </div>
    </motion.main>
  );
}


