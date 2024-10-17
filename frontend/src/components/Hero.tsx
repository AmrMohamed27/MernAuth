import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { getUserInfo } from "@/lib/utils";
import LogoutDialog from "./LogoutDialog";
import { useState } from "react";

const Hero = () => {
  const userInfo = getUserInfo();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <Card className="bg-gray-200 flex items-center flex-col border-2 border-slate-300">
      <CardHeader className="items-center gap-4">
        <CardTitle>MERN Authentication</CardTitle>
        <CardDescription className="text-center flex flex-col gap-4">
          <p>
            This is a boilerplate for MERN authentication that stores a JWT in
            an HTTP-Only cookie. It also uses Redux Toolkit, TailwindCSS, ShadCN
            UI Component Library and TypeScript.
          </p>
          {userInfo && (
            <span className="font-bold">Welcome back, {userInfo.name}!</span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-8 flex-row">
          {userInfo ? (
            <>
              {/* Logout */}
              <Button
                variant={"default"}
                onClick={openDialog}
                className="text-white bg-blue-500 hover:no-underline  hover:bg-blue-600 flex items-center"
              >
                <span>Log Out</span>
              </Button>
              <LogoutDialog
                isDialogOpen={isDialogOpen}
                closeDialog={closeDialog}
                setIsDialogOpen={setIsDialogOpen}
              />
            </>
          ) : (
            <>
              {/* Login */}
              <Button
                variant={"default"}
                className="text-white bg-blue-500 hover:no-underline  hover:bg-blue-600 flex items-center"
              >
                <Link to="/login" className="flex items-center gap-2">
                  <span>Sign In</span>
                </Link>
              </Button>
              {/* Register */}
              <Button
                variant={"secondary"}
                className="text-white hover:no-underline bg-gray-600 hover:bg-gray-700"
              >
                <Link to="/register" className="flex items-center gap-3">
                  <span>Sign Up</span>
                </Link>
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Hero;
