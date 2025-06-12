"use client"

import { authClient } from "@/lib/auth/auth-client";
import { Button } from "@/components/ui/button"

export default function Logout() {
  const handleLogout = async () => {
    await authClient.signOut()
    console.log('signed out')
  }

  return (
    <Button variant="outline" onClick={handleLogout}>
      Logout
    </Button>
  )
}

