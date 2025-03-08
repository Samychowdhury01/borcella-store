"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Icons } from "@/components/icon-file"
import toast from "react-hot-toast"
import { createUser } from "@/actions/user-action"
import { CheckCircle } from "lucide-react"
import PasswordInput from "../_components/password-input"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
})

export default function SignUpPage() {
  const [isLoading, startTransition] = useTransition()
  const [error, setError] = useState("")
  const [isSignupSuccessful, setIsSignupSuccessful] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      try {
        const newUser = await createUser(values)
console.log(newUser)
        if (newUser?.id) {
          setUserEmail(newUser.email)
          setIsSignupSuccessful(true)
          // Instead of redirecting, we'll show the success message
          // router.push(`/auth/verify-email?email=${newUser.email}`);
        }else{
          toast.error("Something went wrong. Try Again!")
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        toast.error("Something went wrong!")
      }
    })
    setError("")
  }

  return (
    <div className="flex h-screen w-full items-center justify-center p-4">
      <Card className="w-full max-w-md border-2 p-8 rounded-xl">
        {isSignupSuccessful ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-8">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <h2 className="text-xl font-semibold text-center">Sign up successful</h2>
            <p className="text-center text-muted-foreground">Check your email ({userEmail}) to verify your account.</p>
            <Button variant="outline" onClick={() => router.push("/auth")} className="mt-4">
              Go to Login
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-center">Create an Account</h1>

            {error && (
              <div className="p-3 bg-red-900/30 border border-red-500 text-red-400 rounded-md text-sm">{error}</div>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <PasswordInput form={form}/>

                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      Signing up...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </form>
            </Form>

            <div className="text-center text-sm">
              <p>
                Already have an account?{" "}
                <Link href="/auth" className="text-blue-300 hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}

