import Link from "next/link";

function TopNav() {
  return (
    <>
      <div className="navbar bg-gray-800/20 shadow-sm">
        <div className="flex-none">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
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
          <img src="/assets/tipster-logo.png" alt="Tip Ster Logo" className="h-10 object-cover " />
          </Link>
        </div>
        <div className="flex-none space-x-2 items-center">
          <Link href="/login" className="btn  btn-sm bg-[#EAB308] p-2 cursor-pointer border border-amber-400 hover:border-green-600">Login</Link>
          <Link href="/register" className="btn  btn-sm bg-[#10B981] p-2 cursor-pointer border border-green-600 hover:border-amber-400">Register</Link>
        </div>
      </div>
    </>
  );
}

export default TopNav;
