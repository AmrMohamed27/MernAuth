/* eslint-disable @typescript-eslint/no-restricted-imports */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import type { LogoutDialogProps } from "@/types";
import { useLogoutMutation } from "@/slices/usersApiSlice";
import { clearCredentials } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const LogoutDialog = ({
  isDialogOpen,
  closeDialog,
  setIsDialogOpen,
}: LogoutDialogProps) => {
  // logout api and redux declarations
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Function to handle logout
  const logoutHandler = async () => {
    try {
      await logoutApiCall({}).unwrap();
      dispatch(clearCredentials({}));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {/* Dialog Component */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to log out?</DialogTitle>
            <DialogDescription>
              You will be able to sign back in. No data will be lost if you log
              out.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={closeDialog}
              className="bg-gray-500 hover:bg-gray-600 text-white"
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white"
              onClick={logoutHandler}
            >
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LogoutDialog;
