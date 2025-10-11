"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card";
import Link from "next/link";
import { authClient } from "@/app/lib/auth-client";
import { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Please enter your password." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function SignInView() {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setError(null);
    setPending(true);

    authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          setPending(false);
        },
        onError: ({ error }) => {
          setPending(false);
          setError(error.message);
        },
      }
    );
  };
  const onSocial = (provider: "google" | "github") => {
    setError(null);
    setPending(true);
    authClient.signIn.social(
      { provider: provider, callbackURL: "/" },
      {
        onSuccess: () => {
          setPending(false);
        },
        onError: ({ error }) => {
          setPending(false);
          setError(error.message);
        },
      }
    );
  };

  return (
    <div className="bg-muted min-h-svh flex items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-4xl rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <Card className="m-0 rounded-none">
          <CardHeader className="flex justify-center items-center">
            <div className="flex flex-col gap-1">
              <CardTitle className="text-2xl md:text-3xl font-bold">
                Welcome back
              </CardTitle>
              <CardDescription className="text-center">
                Login to your account
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          {...field}
                          placeholder="m@example.com"
                        />
                      </FormControl>
                      <FormDescription>
                        Enter your email below to login.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel>Password</FormLabel>
                      </div>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {!!error && (
                  <div className="text-sm text-red-600 text-center">
                    {error}
                  </div>
                )}

                <div>
                  <Button
                    disabled={pending}
                    type="submit"
                    className="w-full bg-black text-white"
                  >
                    Sign in
                  </Button>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex-1 h-px bg-muted-foreground/20"></span>
                  <span className="text-xs text-muted-foreground">
                    Or continue with
                  </span>
                  <span className="flex-1 h-px bg-muted-foreground/20"></span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    onClick={() => onSocial("google")}
                    disabled={pending}
                    variant="outline"
                    className="w-full"
                  >
                    <FaGoogle />
                  </Button>
                  <Button
                    type="button"
                    disabled={pending}
                    onClick={() => onSocial("github")}
                    variant="outline"
                    className="w-full"
                  >
                    <FaGithub />
                  </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/sign-up"
                    className="underline-offset-4 underline"
                  >
                    sign-up
                  </Link>
                </div>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex-col" />
        </Card>

        <div className="hidden md:flex items-center justify-center p-8 md:p-12 bg-gradient-to-b from-green-600 to-green-800 text-white">
          <div className="flex flex-col items-center">
            <Image
              src="/logo.svg"
              alt="Meet.AI logo"
              width={140}
              height={140}
            />
            <div className="mt-6 text-xl font-semibold">Meet.AI</div>
          </div>
        </div>
      </div>
    </div>
  );
}
