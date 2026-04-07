# Compliance App — Copilot Instructions

## Project Overview

This is a **GRC (Governance, Risk & Compliance)** web application built with:

- **Backend**: AdonisJS v7 (Node.js MVC framework)
- **ORM**: Lucid v22 (Active Record, built on Knex)
- **Validation**: VineJS v4
- **Frontend**: React 19 via Inertia.js (`@adonisjs/inertia` v4)
- **Routing (type-safe)**: Tuyau (`@tuyau/core`)
- **Database**: MySQL (primary), SQLite (dev/test fallback)
- **UI**: shadcn/ui + Radix UI + Tailwind CSS v4 + CVA + Lucide-React icons
- **Build**: Vite 7 + `@adonisjs/vite`
- **Auth**: Session-based (`@adonisjs/auth` web guard)
- **Language**: TypeScript 5.9 throughout — backend and frontend

---

## Project Setup

### Prerequisites

- Node.js ≥ 24.x, npm ≥ 11.x, pnpm ≥ 9.x
- MySQL 8+ database running locally or remotely

### First-Time Setup

```bash
# Install dependencies
pnpm install

# Copy environment file and fill in values
cp .env.example .env
```

Required `.env` variables:

```dotenv
TZ=UTC
PORT=3333
HOST=localhost
LOG_LEVEL=info
APP_KEY=<generate with: node ace generate:key>
NODE_ENV=development

# MySQL database
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_DATABASE=compliance_app

# Seed password (dev only)
SEED_USER_PASSWORD=Pa$$w0rd!
```

### Database Setup

```bash
# Run all pending migrations (also regenerates database/schema.ts)
node ace migration:run

# Seed initial data (roles + dev users)
node ace db:seed

# Rollback all migrations (destructive)
node ace migration:rollback --batch=0

# Refresh: rollback + re-run + seed
node ace migration:fresh --seed
```

### Development

```bash
# Start dev server with Hot Module Replacement (recommended)
node ace serve --hmr

# TypeScript type-check (both backend + frontend)
pnpm typecheck

# Lint
pnpm lint

# Format
pnpm format

# Run tests
pnpm test
```

### Production Build

```bash
node ace build
node bin/server.js
```

---

## Architecture — MVC + Service Layer

```
app/
├── controllers/    # HTTP request handling (thin layer)
├── middleware/     # Request pipeline (auth, inertia sharing, etc.)
├── models/         # Active Record domain objects (extend schema classes)
├── services/       # Business logic (stateless, used by controllers)
├── transformers/   # Model → frontend-safe serialization
└── validators/     # VineJS schemas for request validation

database/
├── migrations/     # Incremental schema changesets
├── schema.ts       # AUTO-GENERATED — never edit manually
├── schema_rules.ts # Custom schema extension rules
└── seeders/        # Initial/dev data seeding

inertia/
├── app.tsx         # Frontend entrypoint (layout resolver)
├── client.ts       # Tuyau type-safe client
├── types.ts        # InertiaProps<T> helper type
├── layouts/        # auth.tsx, dashboard.tsx, default.tsx
├── pages/          # Inertia page components (mirrors route structure)
├── components/     # Shared React components (shadcn/ui wrappers, etc.)
├── lib/            # Frontend utilities (cn, compliance_ui, mock_data)
└── hooks/          # Custom React hooks

start/
├── routes.ts       # All route definitions
├── kernel.ts       # HTTP middleware stack
└── validator.ts    # VineJS global config
```

---

## Naming Conventions

| Layer | Convention | Example |
|---|---|---|
| Files | `snake_case.ts` | `risk_service.ts`, `auth_middleware.ts` |
| Classes | `PascalCase` | `RisksController`, `RiskService` |
| Variables / props | `camelCase` | `fullName`, `mfaEnabled` |
| Database columns | `snake_case` | `full_name`, `mfa_enabled` |
| Route URLs | `kebab-case` (Spanish) | `/riesgos`, `/normas-controles` |
| Route names | `dot.notation` | `riesgos.store`, `riesgos.update` |
| Inertia pages | `category/page-name` | `dashboard/risks`, `auth/login` |
| Enum-like values | string const arrays | `VALID_ROLES`, `VALID_STATUSES` |

---

## Models (Lucid ORM — Active Record)

### Key Rule: Extend Schema Classes, Not BaseModel

`database/schema.ts` is **auto-generated** after every `migration:run`. Models **must** extend the schema class, never `BaseModel` directly.

```typescript
// app/models/risk.ts
import { RiskSchema } from '#database/schema'

export default class Risk extends RiskSchema {
  // Add computed getters and methods here
  get code(): string {
    return `RSK-${String(this.id).padStart(3, '0')}`
  }

  get score(): number {
    return this.impact * this.probability
  }

  get level(): 'critical' | 'high' | 'medium' | 'low' {
    if (this.score >= 15) return 'critical'
    if (this.score >= 10) return 'high'
    if (this.score >= 6) return 'medium'
    return 'low'
  }
}
```

### Model Patterns

- Use **lifecycle hooks** (`@beforeSave`, `@afterCreate`, etc.) for invariants like password hashing
- User model composes `withAuthFinder(hash)` mixin for authentication
- Computed getters encode domain logic: `user.isActive()`, `risk.level`, `risk.code`
- Relationships: `hasMany`, `belongsTo`, `manyToMany` via Lucid decorators
- Always use `findOrFail()` in controllers — never `find()` and then check null manually
- Use `updateOrCreate()` in seeders for idempotency

```typescript
// Correct — controller pattern
const risk = await Risk.findOrFail(params.id)

// Correct — seeder pattern  
await Role.updateOrCreate({ slug: role.slug }, role)
```

---

## Migrations (Lucid)

### Creating Migrations

```bash
node ace make:migration create_audits_table
node ace make:migration alter_risks_add_tags
```

### Migration Template

```typescript
// database/migrations/<timestamp>_create_<name>_table.ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'audits'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title', 255).notNullable()
      table.text('description').nullable()
      table.enum('status', ['open', 'closed']).defaultTo('open')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps(true, true) // created_at, updated_at with auto-set
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
```

### Migration Rules

- Always provide an `up()` and a `down()` method
- Timestamps: use `table.timestamps(true, true)` for `created_at`/`updated_at`
- Columns: `snake_case` in DB — Lucid maps automatically to `camelCase` in models
- After running migrations, regenerate schema: `node ace migration:run` outputs `database/schema.ts`
- Never alter `database/schema.ts` — it is auto-generated
- Prefer `ALTER TABLE` migrations over editing existing ones for deployed databases

---

## Seeders

```bash
node ace make:seeder AuditSeeder
node ace db:seed                     # runs MainSeeder (which chains others)
node ace db:seed --files="AuditSeeder"
```

### Seeder Template

```typescript
// database/seeders/audit_seeder.ts
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Audit from '#models/audit'

export default class AuditSeeder extends BaseSeeder {
  async run() {
    await Audit.updateOrCreateMany('slug', [
      { slug: 'iso-27001-2024', title: 'ISO 27001:2024 Audit', status: 'open' },
    ])
  }
}
```

### Seeder Rules

- **Always idempotent**: use `updateOrCreate()` or `updateOrCreateMany()`, never `create()` blindly
- Environment guard for sensitive data: check `app.nodeEnvironment` before seeding dev-only records
- Register new seeders in `MainSeeder` to ensure correct execution order
- Depend on role/user existence: run `RoleSeeder` before `UserSeeder`

```typescript
// database/seeders/main_seeder.ts
import app from '@adonisjs/core/services/app'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class MainSeeder extends BaseSeeder {
  async run() {
    await new RoleSeeder(this.client).run()
    if (app.nodeEnvironment === 'development' || app.nodeEnvironment === 'test') {
      await new UserSeeder(this.client).run()
    }
  }
}
```

---

## Controllers

### Rules

- Controllers are **thin**: validate → delegate to service → transform → respond
- Inject `inertia`, `request`, `auth`, `response`, `params` from `HttpContext`
- Always validate with `request.validateUsing(validator)` before touching the DB
- Use `inertia.render('page/name', { props })` — first argument is the page path relative to `inertia/pages/`
- For redirects: `response.redirect().back()` or `response.redirect().toRoute('route.name')`
- Use typed `controllers` registry from `#generated/controllers` in routes

```typescript
// app/controllers/risks_controller.ts
import type { HttpContext } from '@adonisjs/core/http'
import { createRiskValidator, updateRiskValidator } from '#validators/risk'
import RiskTransformer from '#transformers/risk_transformer'
import RiskService from '#services/risk_service'

export default class RisksController {
  async index({ inertia }: HttpContext) {
    const risks = await new RiskService().all()
    return inertia.render('dashboard/risks', {
      risks: risks.map((r) => new RiskTransformer(r).toObject()),
    })
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createRiskValidator)
    await new RiskService().create(data)
    return response.redirect().toRoute('riesgos')
  }

  async update({ request, response, params }: HttpContext) {
    const data = await request.validateUsing(updateRiskValidator)
    await new RiskService().update(params.id, data)
    return response.redirect().toRoute('riesgos')
  }

  async destroy({ response, params }: HttpContext) {
    await new RiskService().destroy(params.id)
    return response.redirect().toRoute('riesgos')
  }
}
```

---

## Services

- Encapsulate **business logic** that would bloat controllers
- Stateless classes — instantiated with `new XxxService()` in controllers
- Return model instances; transformers are applied in the controller layer

```typescript
// app/services/risk_service.ts
import Risk from '#models/risk'

export interface RiskData {
  title: string
  category: string
  description?: string | null
  impact: number
  probability: number
  treatment: string
  owner: string
  status: string
  frameworks?: string | null
}

export default class RiskService {
  all() {
    return Risk.query().orderBy('id', 'desc')
  }

  find(id: number) {
    return Risk.findOrFail(id)
  }

  create(data: RiskData) {
    return Risk.create(data)
  }

  async update(id: number, data: Partial<RiskData>) {
    const risk = await Risk.findOrFail(id)
    risk.merge(data)
    return risk.save()
  }

  async destroy(id: number) {
    const risk = await Risk.findOrFail(id)
    await risk.delete()
  }
}
```

---

## Transformers

Transformers serialize model instances to plain objects safe for the Inertia/JSON layer. They generate TypeScript types used on the frontend via `@generated/data`.

```typescript
// app/transformers/risk_transformer.ts
import { BaseTransformer } from '@adonisjs/core/transformers'
import Risk from '#models/risk'

export default class RiskTransformer extends BaseTransformer<Risk> {
  toObject() {
    return {
      ...this.model.pick(['id', 'title', 'category', 'description',
        'impact', 'probability', 'treatment', 'owner', 'status', 'frameworks']),
      code: this.model.code,
      score: this.model.score,
      level: this.model.level,
      createdAt: this.model.createdAt.toISO(),
      updatedAt: this.model.updatedAt?.toISO() ?? null,
    }
  }
}
```

### Transformer Rules

- Never expose sensitive fields: always explicitly pick fields or omit `password`, tokens, etc.
- Add computed/derived fields (e.g., `code`, `score`, `level`, `initials`)
- Serialize `DateTime` (Luxon) with `.toISO()` — never pass raw Luxon objects to Inertia
- Use `new XxxTransformer(model).toObject()` for single items
- Use `.map((m) => new XxxTransformer(m).toObject())` for collections
- Frontend types in `@generated/data` are inferred from transformer return shapes

---

## Validators (VineJS v4)

```typescript
// app/validators/risk.ts
import vine from '@vinejs/vine'

export const RISK_CATEGORIES = [
  'Seguridad TI', 'Privacidad', 'Continuidad', 'Operacional',
  'Cumplimiento', 'Legal', 'Gobernanza', 'Financiero', 'Reputacional',
] as const

export const RISK_TREATMENTS = ['mitigate', 'accept', 'transfer', 'avoid'] as const
export const RISK_STATUSES = ['open', 'in-treatment', 'accepted', 'closed'] as const

const riskFields = vine.object({
  title: vine.string().minLength(1).maxLength(255),
  category: vine.string().in([...RISK_CATEGORIES]),
  description: vine.string().maxLength(2000).optional(),
  impact: vine.number().min(1).max(5),
  probability: vine.number().min(1).max(5),
  treatment: vine.string().in([...RISK_TREATMENTS]),
  owner: vine.string().minLength(1).maxLength(255),
  status: vine.string().in([...RISK_STATUSES]),
  frameworks: vine.string().maxLength(500).optional(),
})

export const createRiskValidator = vine.compile(riskFields)
export const updateRiskValidator = vine.compile(riskFields)
```

### Validator Rules

- Always `vine.compile()` — not `vine.create()` — for reusable validators
- Use `.unique()` for DB uniqueness — pass custom query to exclude current record on updates
- `.in([...CONST_ARRAY])` for enum-like fields — define constants so they are reusable in frontend
- Use `request.validateUsing(validator)` in controllers — VineJS sends errors to flash automatically
- For create/update validators that differ (e.g., unique check), export separate named validators

```typescript
// Unique email excluding the current user (update scenario)
export const createUpdateUserValidator = (userId?: number) =>
  vine.compile(
    vine.object({
      email: vine.string().email().unique(async (db, value) => {
        const query = db.from('users').where('email', value)
        if (userId) query.whereNot('id', userId)
        const user = await query.first()
        return !user
      }),
    })
  )
```

---

## Routes

```typescript
// start/routes.ts
import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

// Protected dashboard group
router.group(() => {
  router.get('/riesgos', [controllers.Risks, 'index']).as('riesgos')
  router.post('/riesgos', [controllers.Risks, 'store']).as('riesgos.store')
  router.put('/riesgos/:id', [controllers.Risks, 'update']).as('riesgos.update')
  router.delete('/riesgos/:id', [controllers.Risks, 'destroy']).as('riesgos.destroy')
}).use(middleware.auth())

// Guest-only (auth pages)
router.group(() => {
  router.get('/login', [controllers.Session, 'create']).as('session.create')
  router.post('/login', [controllers.Session, 'store']).as('session.store')
}).use(middleware.guest())

// Simple Inertia page (no controller needed)
router.on('/ruta').renderInertia('dashboard/page-name', {}).as('route.name')
```

### Route Rules

- Always assign `.as('name')` — required for `Link route="..."` and `Form route="..."` on the frontend
- Use plural kebab-case Spanish for resources: `/riesgos`, `/controles`, `/politicas`
- Use `[controllers.Xxx, 'action']` — the typed registry prevents typos
- Group protected routes under `.use(middleware.auth())`, auth pages under `.use(middleware.guest())`
- Prefer `router.on().renderInertia()` for read-only pages that need no props from a controller

---

## Middleware

### Named Middleware (use per-route or per-group)

| Middleware | Description |
|---|---|
| `middleware.auth()` | Requires authenticated session; redirects to `/login` |
| `middleware.guest()` | Blocks logged-in users; redirects to `/` |

### InertiaMiddleware (shared props)

Every page automatically receives from `app/middleware/inertia_middleware.ts`:

```typescript
{
  errors: Record<string, string>   // VineJS validation errors from flash
  flash: { error?: string }        // One-time flash messages
  user: TransformedUser | undefined // Authenticated user (safe fields only)
}
```

Do not pass `errors`, `flash`, or `user` as explicit Inertia props — they are shared automatically.

---

## Frontend (React + Inertia)

### Page Component Pattern

Pages live at `inertia/pages/` and map 1:1 to `inertia.render()` calls.

```tsx
// inertia/pages/dashboard/risks.tsx
import { InertiaProps } from '~/types'
import { Data } from '@generated/data'

type PageProps = InertiaProps<{
  risks: Data.Risk[]
}>

export default function Risks({ risks }: PageProps) {
  return (
    <div>
      {risks.map((risk) => (
        <div key={risk.id}>{risk.title}</div>
      ))}
    </div>
  )
}
```

### Layout Resolution (Automatic)

Layouts are assigned automatically in `inertia/app.tsx` based on the page name prefix:

| Page path prefix | Layout used |
|---|---|
| `auth/*` | `layouts/auth.tsx` — minimal, shows toasts |
| `dashboard/*` | `layouts/dashboard.tsx` — sidebar + AI companion |
| (anything else) | `layouts/default.tsx` — bare wrapper |

Do **not** import or wrap layouts manually in page components.

### Forms

```tsx
import { Form } from '@adonisjs/inertia/react'

// POST to named route
<Form route="riesgos.store">
  {({ errors }) => (
    <>
      <input name="title" />
      {errors.title && <p>{errors.title}</p>}
      <button type="submit">Guardar</button>
    </>
  )}
</Form>

// PUT to named route with param
<Form route="riesgos.update" routeParams={{ id: risk.id }}>
  {({ errors }) => ( ... )}
</Form>
```

### Links

```tsx
import { Link } from '@adonisjs/inertia/react'
import { urlFor } from '~/client'

// Named route
<Link route="riesgos">Ver riesgos</Link>

// With params
<Link route="riesgos.update" routeParams={{ id: risk.id }}>Editar</Link>

// With query string (use urlFor + href)
<Link href={urlFor('riesgos', {}, { qs: { page: 2 } })}>Página 2</Link>
```

### Accessing Shared Props

```tsx
import { usePage } from '@inertiajs/react'
import { Data } from '@generated/data'

// Inside a component (not a page)
const { props } = usePage<Data.SharedProps>()
const user = props.user
```

### TypeScript Rule

Always type page props using `InertiaProps<T>` from `~/types`:

```tsx
type PageProps = InertiaProps<{ myProp: Data.SomeType }>
```

Never use `any` — generated `Data.*` types from `@generated/data` are the source of truth.

---

## UI Components (shadcn/ui + Tailwind CSS v4)

- Base UI components live in `inertia/components/ui/` — treat them as a library, prefer editing sparingly
- Use `cn()` from `~/lib/utils` to merge Tailwind classes conditionally:

```tsx
import { cn } from '~/lib/utils'
<div className={cn('base-class', condition && 'conditional-class')} />
```

- Use `compliance_ui.ts` for risk level/priority/severity/role/status badge configs — do not inline these styles
- Icons: always use `lucide-react` — import only specific icons needed: `import { ShieldAlertIcon } from 'lucide-react'`
- Toast notifications: `import { toast } from 'sonner'` — flash errors are shown automatically via `DashboardLayout`
- Tailwind CSS v4 is used — utility classes follow v4 conventions (no config file, uses `@import "tailwindcss"`)

---

## Authentication

- Session-based (`web` guard) — no JWT or API tokens by default
- Login: `auth.use('web').login(user)` — sets session cookie
- Logout: `auth.use('web').logout()` — clears session
- Auth check in controllers: `auth.getUserOrFail()` or rely on `middleware.auth()` group
- Current user available in `ctx.auth.user` (already loaded by `initialize_auth_middleware`)
- Passwords: always hashed via `withAuthFinder(hash)` mixin — never store plaintext

---

## Code Generation

After scaffold commands, regenerate the type registry:

```bash
# After adding/modifying controllers
node ace generate:types

# After running migrations (regenerates database/schema.ts)
node ace migration:run
```

Auto-generated files (never edit manually):
- `database/schema.ts` — model column types
- `.adonisjs/client/data.d.ts` — frontend `Data.*` types from transformers
- Files under `@generated/` — controller registry, route registry (Tuyau)

---

## File Creation Checklist

When adding a new resource (e.g., `Audit`):

1. **Migration**: `node ace make:migration create_audits_table` → define schema → `node ace migration:run`
2. **Seeder** (if needed): `node ace make:seeder AuditSeeder` → use `updateOrCreate` → register in `MainSeeder`
3. **Model**: `node ace make:model Audit` → extend generated `AuditSchema` → add computed getters/methods
4. **Validator**: create `app/validators/audit.ts` → define and `vine.compile()` schemas
5. **Transformer**: create `app/transformers/audit_transformer.ts` → extend `BaseTransformer<Audit>`
6. **Service**: create `app/services/audit_service.ts` → implement CRUD methods with typed interface
7. **Controller**: `node ace make:controller AuditsController` → thin; validate → service → transform → render/redirect
8. **Routes**: add to `start/routes.ts` inside the protected group → named with `.as('audits.*')`
9. **Pages**: create `inertia/pages/dashboard/audits/` directory with `index.tsx` and form components
10. **Type-check**: run `pnpm typecheck` after generation

---

## Testing (Japa)

```bash
pnpm test
# or
node ace test
```

Tests live in `tests/`. Use Japa's HTTP client for integration tests against the AdonisJS server. Seed the database before test suites that require data.

---

## Security Checklist

- CSRF: handled automatically by `@adonisjs/shield` + Inertia's `enableXsrfCookie`
- Validation: always use VineJS validators at controller boundaries — never trust raw `request.body()`
- Auth: all non-public routes must be in a `middleware.auth()` group
- Password storage: never store plaintext — `withAuthFinder(hash)` handles hashing
- `password` field: always excluded in transformers — never pass to Inertia
- SQL injection: impossible with Lucid query builder — avoid raw queries unless absolutely necessary; when used, always escape with `db.raw('?', [value])`
- Environment variables: never hardcode credentials — use `.env` + `start/env.ts` typed env schema

---

## Common Pitfalls

| Pitfall | Correct Approach |
|---|---|
| Edit `database/schema.ts` | Never — re-run migrations to regenerate it |
| Import `BaseModel` directly in models | Import and extend the generated schema class |
| Pass raw Lucid model to Inertia | Always transform with `XxxTransformer` first |
| Pass `DateTime` (Luxon) to Inertia | Serialize with `.toISO()` in transformer |
| Import `Form`/`Link` from `@inertiajs/react` | Import from `@adonisjs/inertia/react` instead |
| Manually add layout to page component | Let `inertia/app.tsx` resolve it via page name prefix |
| Use `find()` then check null | Use `findOrFail()` — throws 404 automatically |
| Seeder using `create()` (no idempotency) | Use `updateOrCreate()` or `updateOrCreateMany()` |
| Hardcode URLs in `Link` / `Form` | Always use `route="route.name"` prop |

---

## Key Reference Files

| Purpose | File |
|---|---|
| Route definitions | [start/routes.ts](../start/routes.ts) |
| Middleware stack | [start/kernel.ts](../start/kernel.ts) |
| Shared Inertia props | [app/middleware/inertia_middleware.ts](../app/middleware/inertia_middleware.ts) |
| Frontend entry + layout resolver | [inertia/app.tsx](../inertia/app.tsx) |
| Type-safe Tuyau client | [inertia/client.ts](../inertia/client.ts) |
| Frontend type helper | [inertia/types.ts](../inertia/types.ts) |
| UI class utilities | [inertia/lib/utils.ts](../inertia/lib/utils.ts) |
| Compliance UI configs | [inertia/lib/compliance_ui.ts](../inertia/lib/compliance_ui.ts) |
| DB config (MySQL) | [config/database.ts](../config/database.ts) |
| Auth config | [config/auth.ts](../config/auth.ts) |
| Auto-generated schema | [database/schema.ts](../database/schema.ts) |
