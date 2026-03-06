import { Form } from '@adonisjs/inertia/react'
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

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form route="new_account.store">
          {({ errors }) => (
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
                <Input
                  type="text"
                  name="fullName"
                  id="fullName"
                  className={`w-full h-10 rounded border px-4 ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.fullName && <div className="text-red-500 text-sm font-medium mt-0.5">{errors.fullName}</div>}
              </Field>

              <Field>
                <FieldLabel htmlFor="email" className="mb-1 block text-sm font-medium">Email</FieldLabel>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
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
                  autoComplete="new-password"
                  className={`w-full h-10 rounded border px-4 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.password && <div className="text-red-500 text-sm font-medium mt-0.5">{errors.password}</div>}
              </Field>

              <Field>
                <FieldLabel htmlFor="passwordConfirmation" className="mb-1 block text-sm font-medium">Confirm password</FieldLabel>
                <Input
                  type="password"
                  name="passwordConfirmation"
                  id="passwordConfirmation"
                  autoComplete="new-password"
                  className={`w-full h-10 rounded border px-4 ${errors.passwordConfirmation ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.passwordConfirmation && <div className="text-red-500 text-sm font-medium mt-0.5">{errors.passwordConfirmation}</div>}
              </Field>

              <Field>
                <Button type="submit" 
                  className="w-full rounded py-4.5">
                  Sign up
                </Button>
              </Field>
            </FieldGroup>
          )}
        </Form>
      </CardContent>
    </Card>
  )
}
