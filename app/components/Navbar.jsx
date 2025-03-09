"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Login from "./LoginBtn";

const Navbar = () => {
  const pathname = usePathname();

  const isActive = (path) => {
    return pathname === path ? "text-blue-500" : "";
  };

  return (
    <nav className="flex flex-wrap justify-between items-center py-4 px-6 bg-gray-900 border-b border-gray-800">
      <Link href="/" className="text-xl font-bold">
        Todo App
      </Link>

      <ul className="flex items-center gap-8">
        <li>
          <Link
            href="/"
            className={`hover:text-blue-500 transition-colors ${isActive("/")}`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/todos"
            className={`hover:text-blue-500 transition-colors ${isActive("/todos")}`}
          >
            Todos
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className={`hover:text-blue-500 transition-colors ${isActive("/about")}`}
          >
            About
          </Link>
        </li>
      </ul>

      <Login />
    </nav>
  );
};

export default Navbar;
