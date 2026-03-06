import { Form } from '@adonisjs/inertia/react'

export default function Signup() {
  return (
    <div className="flex flex-col justify-center max-w-sm mx-auto">
      <div>
        <h1 className="text-3xl tracking-tight my-1"> Signup </h1>
        <p className="text-lg mb-12 text-gray-500">Enter your details below to create your account</p>
      </div>

      <div>
        <Form route="new_account.store">
          {({ errors }) => (
            <div className="flex flex-col gap-6">
              <div>
                <label htmlFor="fullName" className="mb-1 block text-sm font-medium">Full name</label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  className={`w-full h-10 rounded border px-4 ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.fullName && <div className="text-red-500 text-sm font-medium mt-0.5">{errors.fullName}</div>}
              </div>

              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  className={`w-full h-10 rounded border px-4 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && <div className="text-red-500 text-sm font-medium mt-0.5">{errors.email}</div>}
              </div>

              <div>
                <label htmlFor="password" className="mb-1 block text-sm font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="new-password"
                  className={`w-full h-10 rounded border px-4 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.password && <div className="text-red-500 text-sm font-medium mt-0.5">{errors.password}</div>}
              </div>

              <div>
                <label htmlFor="passwordConfirmation" className="mb-1 block text-sm font-medium">Confirm password</label>
                <input
                  type="password"
                  name="passwordConfirmation"
                  id="passwordConfirmation"
                  autoComplete="new-password"
                  className={`w-full h-10 rounded border px-4 ${errors.passwordConfirmation ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.passwordConfirmation && <div className="text-red-500 text-sm font-medium mt-0.5">{errors.passwordConfirmation}</div>}
              </div>

              <div>
                <button type="submit" className="w-full rounded bg-gray-900 text-white py-2.5 font-medium hover:bg-gray-700">
                  Sign up
                </button>
              </div>
            </div>
          )}
        </Form>
      </div>
    </div>
  )
}
