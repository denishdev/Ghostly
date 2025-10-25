"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[rgba(85,208,130,0.4)] group-[.toaster]:text-black group-[.toaster]:border-[#55d082] group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-black",
          actionButton:
            "group-[.toast]:bg-[#55d082] group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-gray-200 group-[.toast]:text-gray-700",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
