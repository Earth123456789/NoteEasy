"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from "@/lib/auth-context"
import { LogOut, NotebookPen } from "lucide-react"

export default function Header() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  // Don't show header on login and register pages
  if (pathname === "/login" || pathname === "/register") {
    return null
  }

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <NotebookPen className="h-6 w-6" />
          <Link href="/" className="text-xl font-bold">
            Note Easy
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  Dashboard
                </Button>
              </Link>
              <Link href="/notes">
                <Button variant="ghost" size="sm">
                  My Notes
                </Button>
              </Link>
              <Button variant="ghost" size="icon" onClick={logout} aria-label="Logout">
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="ghost" size="sm">
                  Register
                </Button>
              </Link>
            </>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

