"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Icons } from "@/components/icon-file"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import PasswordInput from "./_components/password-input"

// Define form schema with zod
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
})

type FormValues = z.infer<typeof formSchema>

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  // Initialize form with react-hook-form and zod resolver
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        redirectTo: "/",
      })

      console.log({ result, email: values.email, pass: values.password })

      if (result?.error) {
        setError("Invalid email or password")
      } else {
        router.push("/")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign in")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn("google", { redirectTo: "/" })
    } catch (error) {
      console.error(error)
      setError("Failed to sign in with Google")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 rounded-xl">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-center">Sign In</h1>
          <Button variant="outline" onClick={handleGoogleSignIn} disabled={isLoading} className="relative w-full">
            <Icons.google className="mr-2 h-4 w-4" />
            Sign-in with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full"></span>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2">OR</span>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

             <PasswordInput form={form}/>

              {error && <div className="text-red-400 text-sm">{error}</div>}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Form>

          <div className="text-center text-sm">
            <p>
              <span className="mr-1">Don't have an account?</span>
              <Link href="/auth/sign-up" className="text-blue-300 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

