import RegisterForm from "@/components/register-form";
import LoginForm from "@/components/login-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as context from "next/headers";
import { auth } from "@/lib/auth/lucia";
import { redirect } from "next/navigation";

export default async function EntryPage() {
  const authRequest = auth.handleRequest("GET", context);
  const session = await authRequest.validate();

  if (session) {
    redirect("/");
  }

  return (
    <Tabs defaultValue="login" className="pb-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">התחברות</TabsTrigger>
        <TabsTrigger value="register">הרשמה</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <LoginForm />
      </TabsContent>
      <TabsContent value="register">
        <RegisterForm />
      </TabsContent>
    </Tabs>
  );
}
