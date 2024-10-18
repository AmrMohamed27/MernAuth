// Zod Imports
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import registerSchema from "@/schema/registerSchema";
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
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
// Redux
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "@/slices/usersApiSlice";
import { setCredentials } from "@/slices/authSlice";
import { useUserInfo } from "@/lib/utils";
import Loading from "../Loading";

const RegisterScreen = () => {
  // Toast function
  const { toast } = useToast();
  // Redux functions
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  // Get user info from state
  const userInfo = useUserInfo();
  // Redirect to homepage if already logged in
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  // Define your form.
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  // Watch the password and confirmPassword field values
  const passwordValue = form.watch("password", "");
  const confirmPasswordValue = form.watch("confirmPassword", "");
  // Define a submit handler.
  async function onSubmit(values: z.infer<typeof registerSchema>) {
    try {
      if (passwordValue !== confirmPasswordValue) {
        toast({
          title: "Passwords do not match",
          description: "Please make sure your passwords match.",
          variant: "destructive",
        });
        return;
      }
      const res = await register({
        name: values.name,
        email: values.email,
        password: values.password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast({
        title: "User Registered Successfully",
        description: `Welcome, ${res.name}!`,
      });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error creating account",
        description: error.data?.message,
        variant: "destructive",
      });
    }
  }
  //   State variable to store the password visibility
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(prev => !prev);
  };

  return (
    <FormContainer header="Create an Account">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="●●●●●●"
                      type={showConfirmPassword ? "text" : "password"}
                      {...field}
                    />
                    <PasswordEye
                      showPassword={showConfirmPassword}
                      toggleShowPassword={toggleShowConfirmPassword}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Loader */}
          <Loading isLoading={isLoading} />
          {/* Buttons */}
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600"
            disabled={
              confirmPasswordValue === "" ||
              confirmPasswordValue !== passwordValue
            }
          >
            Register
          </Button>
          <div>
            <span>
              Already have an account?
              <Link to="/login" className="text-blue-500 hover:underline">
                Sign In!
              </Link>
            </span>
          </div>
        </form>
      </Form>
    </FormContainer>
  );
};

export default RegisterScreen;
