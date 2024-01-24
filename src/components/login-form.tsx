"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

type FormSchema = z.infer<typeof formSchema>;

const formSchema = z.object({
  username: z.string().trim().min(2, {
    message: "שם המשתמש חייב להכיל יותר משני תווים.",
  }),
  password: z.string().min(6, { message: "הסיסמה חייבת להכיל לפחות 6 תווים." }),
});

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = async (values) => {
    const response = await fetch("/api/login", {
      method: "POST",
      redirect: "manual",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (response.status === 0) {
      return router.refresh();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>התחברות</CardTitle>
        <CardDescription>
          התחברות מהירה באמצעות שם המשתמש והסיסמה שלך.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form
            action="/api/login"
            id="login-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>שם משתמש</FormLabel>
                  <FormControl>
                    <Input type="text" autoComplete="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>סיסמה</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button size="lg" type="submit" className="w-full" form="login-form">
          התחברות
        </Button>
      </CardFooter>
    </Card>
  );
}
