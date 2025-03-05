"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Icons } from "@/components/icon-file"

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
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit =  (values: z.infer<typeof formSchema>) => {
    startTransition(async()=>{
        try {
            // Register the user
            const response = await fetch("/api/auth/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(values),
            })
      
            if (!response.ok) {
              const data = await response.json()
              throw new Error(data.message || "Failed to register")
            }
      
            // Sign in the user after successful registration
            const result = await signIn("credentials", {
              redirect: false,
              email: values.email,
              password: values.password,
            })
      
            if (result?.error) {
              throw new Error(result.error || "Failed to sign in")
            }
      
            // Redirect to dashboard or home page
            router.push("/dashboard")
          } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
          } 
    })
    setError("")

    
  }

  

  return (
    <div className="flex h-screen w-full items-center justify-center  p-4">
      <Card className="w-full max-w-md border-2 p-8 rounded-xl">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-center">Create an Account</h1>

          {error && (
            <div className="p-3 bg-red-900/30 border border-red-500 text-red-400 rounded-md text-sm">
              {error}
            </div>
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
                      <Input
                        {...field}
                
                      />
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
                      <Input
                        {...field}
                        type="email"
                    
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </Form>

          <div className="text-center text-sm">
            <p >
              Already have an account?{" "}
              <Link href="/auth/signin" className="text-blue-300 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}