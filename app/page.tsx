import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">Note Easy</h1>
          <p className="text-lg text-muted-foreground">A simple, powerful note-taking application</p>
        </div>
        <div className="flex flex-col space-y-4 mt-8">
          <Link href="/login" passHref>
            <Button className="w-full">
              Login
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/register" passHref>
            <Button variant="outline" className="w-full">
              Register
            </Button>
          </Link>
        </div>
        <div className="mt-8">
          <p className="text-sm text-muted-foreground">
            Organize your thoughts with categories, tags, and powerful search. Track your edit history and collaborate
            with others.
          </p>
        </div>
      </div>
    </div>
  )
}

