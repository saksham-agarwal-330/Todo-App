"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/todos");
    }
  }, [status, router]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col justify-center min-h-[calc(100vh-80px)] py-20 px-4 text-center">
        <h1 className="text-5xl font-bold mb-6">Welcome to Todo App</h1>
        <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
          A simple and efficient way to manage your tasks. Stay organized and boost your productivity with our easy-to-use todo application.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/todos"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md transition-colors"
          >
            Get Started
          </a>
          <a
            href="/about"
            className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-3 rounded-md transition-colors"
          >
            Learn More
          </a>
        </div>
      </section>
    </div>
  );
}

