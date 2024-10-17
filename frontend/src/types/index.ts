import { Dispatch, SetStateAction } from "react";

export interface FormContainerProps {
  children: React.ReactNode;
  header?: string;
  desc?: string;
}

export interface PasswordEyeProps {
  showPassword: boolean;
  toggleShowPassword: () => void;
}

export interface ProfileDropDownProps {
  title: string;
}

export interface LogoutDialogProps {
  isDialogOpen: boolean;
  closeDialog: () => void;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}
