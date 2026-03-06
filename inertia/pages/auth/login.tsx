import { Form } from '@adonisjs/inertia/react'

export default function Login() {
  return (
    <div className="flex flex-col justify-center max-w-sm mx-auto">
      <div>
        <h1 className="text-3xl tracking-tight my-1"> Login </h1>
        <p className="text-lg mb-12 text-gray-500">Enter your details below to login to your account</p>
      </div>

      <div>
        <Form route="session.store">
          {({ errors }) => (
            <div className="flex flex-col gap-6">
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="username"
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
                  autoComplete="current-password"
                  className={`w-full h-10 rounded border px-4 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.password && <div className="text-red-500 text-sm font-medium mt-0.5">{errors.password}</div>}
              </div>

              <div>
                <button type="submit" className="w-full rounded bg-gray-900 text-white py-2.5 font-medium hover:bg-gray-700">
                  Login
                </button>
              </div>
            </div>
          )}
        </Form>
      </div>
    </div>
  )
}
