'use client'
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react";

type Children={
    children:ReactNode
}

const Provider = ({children}:Children) => {
  return (
<SessionProvider>
    {children}
</SessionProvider>
  )
}

export default Provider

