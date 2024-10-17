import {
  FaEye as ShowPassword,
  FaEyeSlash as HidePassword,
} from "react-icons/fa";
import { PasswordEyeProps } from "@/types";

const PasswordEye = ({
  showPassword,
  toggleShowPassword,
}: PasswordEyeProps) => {
  return (
    <button
      type="button"
      onClick={toggleShowPassword}
      className="absolute right-4 top-3"
    >
      {showPassword ? (
        <HidePassword className="text-black" />
      ) : (
        <ShowPassword className="text-black" />
      )}
    </button>
  );
};

export default PasswordEye;
