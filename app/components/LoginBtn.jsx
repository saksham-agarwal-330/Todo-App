"use client";

import { useSession, signIn, signOut } from "next-auth/react"
import { toast } from "react-toastify"

const Login = () => {
  const { data: session, status } = useSession()

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false })
      toast.success("Signed out successfully")
    } catch (error) {
      toast.error("Failed to sign out")
    }
  }

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "authenticated") {
    return (
      <div className="flex items-center gap-4">
        <img
          src={session.user.image}
          alt={session.user.name}
          className="w-8 h-8 rounded-full"
        />
        <button
          onClick={handleSignOut}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          Sign Out
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => signIn("github")}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
    >
      Sign In with GitHub
    </button>
  )
}

export default Login