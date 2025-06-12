import { cookies } from 'next/headers'

import { GoogleSignIn } from '@/components/google-signin'
import { Logout } from '@/components/logout'

export default async function Page() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('better-auth.session_token')
  console.log(`${sessionCookie}`)

  return (
    <div className="flex justify-end">
      {sessionCookie ? <Logout /> : <GoogleSignIn />}
    </div>
  )
}