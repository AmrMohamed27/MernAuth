import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { LogoutDialogProps } from "@/types";

const LogoutDialog = ({
  isDialogOpen,
  closeDialog,
  setIsDialogOpen,
}: LogoutDialogProps) => {
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
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LogoutDialog;
