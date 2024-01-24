"use client"

import { DirectionProvider as RadixDirectionProvider } from "@radix-ui/react-direction"
import { Toaster } from "./ui/sonner"

export default function DirectionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RadixDirectionProvider dir="rtl">
      {children}
      <Toaster />
    </RadixDirectionProvider>
  )
}
