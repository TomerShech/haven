import RegisterForm from "@/components/register-form";
import LoginForm from "@/components/login-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EntryPage() {
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
