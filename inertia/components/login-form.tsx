import { Form, Link } from '@adonisjs/inertia/react'
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "~/components/ui/field"
import { Input } from "~/components/ui/input"
import { cn } from "~/lib/utils"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form route="session.store">
            {({ errors }) => (
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email" className="mb-1 block text-sm font-medium">Email</FieldLabel>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="username"
                    className={`w-full h-10 rounded border px-4 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.email && <div className="text-red-500 text-sm font-medium mt-0.5">{errors.email}</div>}
                </Field>

                <Field>
                  <FieldLabel htmlFor="password" className="mb-1 block text-sm font-medium">Password</FieldLabel>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    className={`w-full h-10 rounded border px-4 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.password && <div className="text-red-500 text-sm font-medium mt-0.5">{errors.password}</div>}
                </Field>

                {/* Do not have an account? Register */}
                <div className="text-sm text-gray-500">
                  Don't have an account? <Link href="/signup" className="text-blue-500 hover:underline">Signup</Link>
                </div>

                <Field>
                  <Button 
                    type="submit"
                    className="w-full rounded py-4.5"
                    >
                    Login
                  </Button>
                </Field>
              </FieldGroup>
            )}
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
