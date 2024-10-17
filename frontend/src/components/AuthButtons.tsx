import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { IoMdLogIn as LogInIcon } from "react-icons/io";
import { FaUserPlus as SignUpIcon } from "react-icons/fa";
import ProfileDropdown from "./ProfileDropdown";
import { UseDispatch } from "react-redux";
import { getUserInfo } from "@/lib/utils";

const AuthButtons = () => {
  const userInfo = getUserInfo();
  return (
    <>
      {userInfo ? (
        <>
          <ProfileDropdown title={userInfo.name} />
        </>
      ) : (
        <>
          {/* Login */}
          <Button
            variant={"link"}
            className="text-white hover:no-underline hover:text-slate-300 flex items-center"
          >
            <Link to="/login" className="flex items-center gap-2">
              <span>Sign In</span>
              <LogInIcon className="h-4 w-4 mt-1" />
            </Link>
          </Button>
          {/* Register */}
          <Button
            variant={"link"}
            className="text-white hover:no-underline hover:text-slate-300"
          >
            <Link to="/register" className="flex items-center gap-3">
              <span>Create an Account</span>
              <SignUpIcon className="mt-1" />
            </Link>
          </Button>
        </>
      )}
    </>
  );
};

export default AuthButtons;
