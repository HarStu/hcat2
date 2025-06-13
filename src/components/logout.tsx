"use client"

import { useRouter } from 'next/navigation'
import { authClient } from "@/lib/auth/auth-client";
import { Button } from "@/components/ui/button"

export function Logout() {
  const router = useRouter()

  const handleLogout = async () => {
    await authClient.signOut()
    router.refresh()
  }

  return (
    <Button
      variant="outline"
      className="w-32 gap-4 m-4"
      onClick={handleLogout}
    >
      Logout
    </Button>
  )
}

