import vine from '@vinejs/vine'

/**
 * Shared rules for email and password.
 */
const email = () => vine.string().email().maxLength(254)
const password = () => vine.string().minLength(8).maxLength(32)

const VALID_ROLES = ['admin', 'ciso', 'compliance', 'auditor', 'employee'] as const
const VALID_STATUSES = ['active', 'inactive', 'pending'] as const

/**
 * Validator to use when performing self-signup
 */
export const signupValidator = vine.create({
  fullName: vine.string().nullable(),
  email: email().unique({ table: 'users', column: 'email' }),
  password: password().confirmed({
    confirmationField: 'passwordConfirmation',
  }),
})

/**
 * Validator to use when an admin updates an existing user.
 * `userId` is used to exclude the current user from the unique-email check.
 */
export const createUpdateUserValidator = (userId: number) =>
  vine.create({
    fullName: vine.string().minLength(1).maxLength(255).nullable(),
    email: email().unique(async (db, value) => {
      const row = await db.from('users').where('email', value).whereNot('id', userId).first()
      return !row
    }),
    role: vine.string().in([...VALID_ROLES]),
    department: vine.string().maxLength(255).optional(),
    status: vine.string().in([...VALID_STATUSES]).optional(),
  })
