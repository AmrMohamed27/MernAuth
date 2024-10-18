// Zod Imports
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import updateSchema from "@/schema/updateSchema";
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
import { useNavigate } from "react-router-dom";
// React Hooks and Functions
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
// Redux
import { useDispatch } from "react-redux";
import { useUpdateMutation } from "@/slices/usersApiSlice";
import { setCredentials } from "@/slices/authSlice";
import { useUserInfo } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const ProfileScreen = () => {
  // Toast function
  const { toast } = useToast();
  // Redux functions
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [update, { isLoading }] = useUpdateMutation();
  // Get user info from state
  const userInfo = useUserInfo();
  // Define your form.
  const form = useForm<z.infer<typeof updateSchema>>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      name: userInfo.name,
      email: userInfo.email,
      password: "",
      confirmPassword: "",
    },
  });
  // Watch the password and confirmPassword field values
  const nameValue = form.watch("name", userInfo.name);
  const emailValue = form.watch("email", userInfo.email);
  const passwordValue = form.watch("password", "");
  const confirmPasswordValue = form.watch("confirmPassword", "");
  // Define a submit handler.
  async function onSubmit(values: z.infer<typeof updateSchema>) {
    try {
      if (passwordValue !== "" && passwordValue !== confirmPasswordValue) {
        toast({
          title: "Passwords do not match",
          description: "Please make sure your passwords match.",
          variant: "destructive",
        });
        return;
      }
      const res =
        passwordValue === ""
          ? await update({
              name: values.name,
              email: values.email,
            }).unwrap()
          : await update({
              name: values.name,
              email: values.email,
              password: values.password,
            }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast({
        title: "User Info Updated Successfully",
        description: `Welcome ${res.name}!`,
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
    <FormContainer header={`${userInfo.name}'s Profile`}>
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
                <FormLabel>New Password</FormLabel>
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
                <FormLabel>Confirm New Password</FormLabel>
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
          {isLoading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <Loader2 className="w-24 h-24 text-white animate-spin" />
            </div>
          )}
          {/* Buttons */}
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600"
            disabled={
              nameValue === userInfo.name && emailValue === userInfo.email && passwordValue === ""
            }
          >
            Save
          </Button>
        </form>
      </Form>
    </FormContainer>
  );
};

export default ProfileScreen;
