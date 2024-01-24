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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type FormSchema = z.infer<typeof formSchema>;

const formSchema = z
  .object({
    name: z.string().trim().min(2, {
      message: "שמך המלא חייב להכיל יותר משתי אותיות.",
    }),
    username: z.string().trim().min(2, {
      message: "שם המשתמש חייב להכיל יותר משני תווים.",
    }),
    password: z
      .string()
      .min(6, { message: "הסיסמה חייבת להכיל לפחות 6 תווים." }),
    confirmPassword: z
      .string()
      .min(1, { message: "יש להזין את סיסמתך בשנית." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "הסיסמאות אינן זהות.",
  });

export default function RegisterForm() {
  const router = useRouter();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = async (values) => {
    const response = await fetch("/api/register", {
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
        <CardTitle>הרשמה</CardTitle>
        <CardDescription>פעם ראשונה שלך פה? כמה שניות ונרשמת.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form
            action="/api/register"
            id="register-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>שם מלא</FormLabel>
                  <FormControl>
                    <Input type="text" autoComplete="name" {...field} />
                  </FormControl>
                  <FormDescription>שמך המלא.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>שם משתמש</FormLabel>
                  <FormControl>
                    <Input type="text" autoComplete="username" {...field} />
                  </FormControl>
                  <FormDescription>
                    כינוי אשר ישמש אותך ברחבי רח&quot;ש.
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
                  <FormLabel>סיסמה</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription>
                    אורך הסיסמה לא יפחת משישה תווים.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>אימות סיסמה</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription>הזנת הסיסמה בשנית.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button size="lg" type="submit" className="w-full" form="register-form">
          הרשמה
        </Button>
      </CardFooter>
    </Card>
  );
}
