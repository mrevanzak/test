"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormInput from "./FormInput";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import useSignUp from "@/lib/api/sign-up";

const SignUpSchema = z.object({
  fullname: z.string().nonempty(),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string(),
});
export type SignUpFormValues = z.infer<typeof SignUpSchema>;

export default function SignUpForm() {
  const { mutate } = useSignUp();

  const methods = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpSchema),
  });
  const onSubmit = methods.handleSubmit((data) => {
    mutate(data);
  });

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <FormProvider {...methods}>
            <FormInput id="fullname" />
            <FormInput id="email" />
            <FormInput id="password" type="password" />
            <FormInput id="phone" />

            <Button type="submit" className="w-full">
              Create an account
            </Button>
          </FormProvider>
        </form>

        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="#" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
