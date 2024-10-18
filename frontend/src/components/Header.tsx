import { useState } from "react";
import { IoMenu as OpenMenu } from "react-icons/io5";
import { IoMdClose as CloseMenu } from "react-icons/io";
import { Link } from "react-router-dom";
import AuthButtons from "./AuthButtons";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };
  return (
    <header className="flex items-center justify-between py-4 px-8 bg-gray-900 text-white">
      <nav className="flex items-center justify-between w-full">
        <Link to="/" className="flex items-center gap-4 flex-row">
          <img src="/assets/images/logo.svg" alt="logo" className="h-8 w-8" />
          <span className="text-lg font-bold">MERN Auth</span>
        </Link>
        {/* Desktop Menu */}
        <div className="items-center gap-4 hidden md:flex">
          <AuthButtons />
        </div>
        {/* Mobile Menu */}
        <div className="flex md:hidden">
          {isOpen ? (
            <CloseMenu
              className="text-2xl cursor-pointer"
              onClick={toggleMenu}
            />
          ) : (
            <OpenMenu
              className="text-2xl cursor-pointer"
              onClick={toggleMenu}
            />
          )}
          <div
            className={`absolute top-0 left-0 transition-transform duration-500 transform min-h-screen flex flex-col gap-16 p-4 bg-gray-900 text-white ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Logo */}
            <div className="flex items-center gap-4 flex-row">
              <img
                src="/assets/images/logo.svg"
                alt="logo"
                className="h-8 w-8"
              />
              <span className="text-lg font-bold">MERN Auth</span>
            </div>
            <div className="flex items-center gap-8 flex-col">
              <AuthButtons />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
