// Zod Imports
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import loginSchema from "@/schema/loginSchema";
// Shadcn Form Imports
import { useForm } from "react-hook-form";
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
// Components
import FormContainer from "../FormContainer";
import PasswordEye from "../PasswordEye";
import { Link, useNavigate } from "react-router-dom";
// React Hooks and Functions
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
// Redux
import { useDispatch } from "react-redux";
import { useLoginMutation } from "@/slices/usersApiSlice";
import { setCredentials } from "@/slices/authSlice";
import { getUserInfo } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const LoginScreen = () => {
  // State variable to store the password visibility
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  // Toast function
  const { toast } = useToast();
  // Redux functions
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const userInfo = getUserInfo();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  // Define form.
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // Define a submit handler.
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const res = await login({
        email: values.email,
        password: values.password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast({
        title: "User Logged In Successfully",
        description: "Welcome back!",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error logging in",
        description: error.data?.message,
        variant: "destructive",
      });
      // Optionally, show error message to the user here
    }
  }

  return (
    <FormContainer header="Sign In">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john@example.com" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="●●●●●●"
                      type={showPassword ? "text" : "password"}
                      {...field}
                    />
                    <PasswordEye
                      showPassword={showPassword}
                      toggleShowPassword={toggleShowPassword}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isLoading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <Loader2 className="w-12 h-12 text-white animate-spin" />
            </div>
          )}
          <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
            Sign In
          </Button>
          <div>
            <span>
              Don't Have an account?{" "}
              <Link to="/register" className="text-blue-500 hover:underline">
                Sign Up!
              </Link>
            </span>
          </div>
        </form>
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;
