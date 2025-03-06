"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { UseFormReturn } from "react-hook-form"
import { Button } from "@/components/ui/button"

const PasswordInput = ({ form }: { form: UseFormReturn<any> }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <div className="relative">
              <Input {...field} type={showPassword ? "text" : "password"} className="pr-10" />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default PasswordInput

