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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// Components
import FormContainer from "../FormContainer";
import PasswordEye from "../PasswordEye";
import { Link } from "react-router-dom";
// React Hooks and Functions
import { useState } from "react";

const RegisterScreen = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof registerSchema>) {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values), // Convert form values to JSON
      });

      if (!response.ok) {
        throw new Error("Failed to sign up");
      }

      const data = await response.json();
      console.log("Register successful:", data);
      // You can also redirect the user or store tokens here, if needed
    } catch (error) {
      console.error("Error creating an account:", error);
      // Optionally, show error message to the user here
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
  // Watch the password and confirmPassword field values
  const usernameValue = form.watch("name", "");
  const emailValue = form.watch("email", "");
  const passwordValue = form.watch("password", "");
  const confirmPasswordValue = form.watch("confirmPassword", "");

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
                {usernameValue.length < 3 && (
                  <FormDescription className="text-red-500">
                    Name must be at least 2 characters long
                  </FormDescription>
                )}
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
                {passwordValue.length < 6 && (
                  <FormDescription className="text-red-500">
                    Password must be at least 6 characters
                  </FormDescription>
                )}
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
                {(confirmPasswordValue === "" ||
                  confirmPasswordValue !== passwordValue) && (
                  <FormDescription className="text-red-500">
                    Passwords do not match
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600"
            disabled={
              confirmPasswordValue === "" ||
              confirmPasswordValue !== passwordValue
            }
          >
            Submit
          </Button>
          <div>
            <span>
              Already have an account?{" "}
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
