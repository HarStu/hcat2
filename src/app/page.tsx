import { redirect } from 'next/navigation'

export default async function Page() {
  return (
    // redirect if the user is not logged in
    redirect(`/play/nixon`)
  )
}