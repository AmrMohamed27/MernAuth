import { useState } from "react";
import { ProfileDropDownProps } from "@/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import LogoutDialog from "./LogoutDialog";

const ProfileDropdown = ({ title }: ProfileDropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <DropdownMenu onOpenChange={open => setIsOpen(open)}>
        <DropdownMenuTrigger className="flex flex-row gap-6 items-center px-4 py-2 rounded-lg">
          <span>{title}</span>
          {isOpen ? (
            <ChevronUp className="h-4 w-4 mt-1" />
          ) : (
            <ChevronDown className="h-4 w-4 mt-1" />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link to="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={openDialog}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <LogoutDialog
        isDialogOpen={isDialogOpen}
        closeDialog={closeDialog}
        setIsDialogOpen={setIsDialogOpen}
      />
    </>
  );
};

export default ProfileDropdown;
