import Link from "next/link";
import { useState } from "react";
import { useLogout } from "@/hooks/useLogout";
import { useAuthContext } from "@/hooks/useAuthContext";

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClick = () => {
    logout();
  };

  return (
    <>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-start sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <Link
                  href="/home"
                  className="text-2xl font-bold text-white"
                  onClick={handleClick}
                >
                  <span className="text-cyan-500">ReporT</span>rânsito
                </Link>
              </div>
            </div>

            {user && (
              <p className="hidden text-sm font-medium text-gray-300 md:block">
                Bem-vindo <span className="text-cyan-500">{user.email}</span>
              </p>
            )}

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen ? "true" : "false"}
                onClick={toggleMenu}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`block h-6 w-6 ${isMenuOpen ? "hidden" : "block"}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className={`h-6 w-6 ${isMenuOpen ? "block" : "hidden"}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div
              className={`space-x-4 sm:flex ${
                isMenuOpen ? "hidden" : "block"
              } hidden sm:block`}
            >
              {user ? (
                <Link
                  href="/"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  onClick={handleClick}
                >
                  Logout
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Cadastro
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        <div
          className={`${isMenuOpen ? "block" : "hidden"} sm:hidden`}
          id="mobile-menu"
        >
          <div className="flex flex-col items-center space-y-1 px-2 pb-3 pt-2">
            {user ? (
              <Link
                href="/"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                onClick={handleClick}
              >
                Logout
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Cadastro
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
