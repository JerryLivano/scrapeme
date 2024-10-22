import { Bars3Icon } from "@heroicons/react/24/outline";
import Breadcrumbs from "./Breadcrumbs";
import UserProfile from "./UserProfile";
import LogoutButton from "./LogoutButton";

export default function HeaderPage({ title, setSidebarOpen }) {
  return (
    <div className="sticky top-0 z-40 flex shrink-0 items-center gap-x-4 bg-[#f9f9f9] px-4 pt-6 pb-2 sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        onClick={setSidebarOpen}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      <div className="flex flex-1 gap-x-4 px-2 pt-2 lg:gap-x-6">
        <div className="relative flex-1 flex-row items-center">
          <h1 className="mb-2 text-2xl font-semibold">{title}</h1>
          <Breadcrumbs />
        </div>
        <div className="flex items-center gap-x-6 lg:gap-x-8">
          <UserProfile />
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
