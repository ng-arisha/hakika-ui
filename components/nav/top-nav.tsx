"use client";

import { logout } from "@/lib/auth/auth";
import { AppDispatch, RootState } from "@/lib/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

function TopNav() {
  const token = useSelector((state: RootState) => state.auth.access_token);
  const user = useSelector((state: RootState) => state.auth.user); // adjust to your state shape
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };
  return (
    <>
    <div className="navbar bg-gray-800/20 shadow-sm">
      <div className="flex-none">
        <label
          htmlFor="my-drawer-4"
          aria-label="open sidebar"
          className="btn btn-square btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            fill="none"
            stroke="currentColor"
            className="my-1.5 inline-block size-4"
          >
            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
            <path d="M9 4v16"></path>
            <path d="M14 10l2 2l-2 2"></path>
          </svg>
        </label>
      </div>

      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          <img
            src="/assets/tipster-logo.png"
            alt="Tip Ster Logo"
            className="h-10 object-cover"
          />
        </Link>
      </div>

      <div className="flex-none space-x-2 items-center">
        {token ? (
          <div className="dropdown dropdown-end">
            {/* Avatar trigger button */}
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar placeholder"
            >
              <div className="bg-[#EAB308] text-gray-900 rounded-full w-9 flex items-center justify-center font-bold text-sm uppercase">
                {user?.username?.charAt(0) ?? "U"}
              </div>
            </div>

            {/* Dropdown menu */}
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-gray-900 border border-gray-700 rounded-xl shadow-xl z-50 w-56 p-2 mt-2"
            >
              {/* User info header */}
              <li className="px-3 py-2 mb-1 border-b border-gray-700">
                <div className="flex flex-col gap-0.5 hover:bg-transparent cursor-default focus:bg-transparent active:bg-transparent">
                  <span className="font-semibold text-white text-sm">
                    {user?.username ?? "User"}
                  </span>
                  <span className="text-gray-400 text-xs truncate">
                    {user?.name ?? ""}
                  </span>
                </div>
              </li>

              {/* My Account */}
              <li>
                <Link
                  href="/my-profile"
                  className="flex items-center gap-2 text-gray-200 hover:bg-gray-700 hover:text-white rounded-lg px-3 py-2 text-sm transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                  My Account
                </Link>
              </li>

              {/* Logout */}
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg px-3 py-2 text-sm w-full text-left transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link
              href="/login"
              className="btn btn-sm bg-[#EAB308] p-2 cursor-pointer border border-amber-400 hover:border-green-600"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="btn btn-sm bg-[#10B981] p-2 cursor-pointer border border-green-600 hover:border-amber-400"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  </>
  );
}

export default TopNav;
