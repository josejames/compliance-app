# Compliance App — Implementation Plan

## Current State

| Module | Status | Notes |
|---|---|---|
| Auth (Login / Signup) | ✅ Done | Full CRUD, session-based |
| 8.1 Users & Roles Admin | ✅ Done | Full CRUD, role assignment |
| 3. Risks (Register) | ✅ Done | Full CRUD, impact/probability matrix |
| 2.1 Frameworks Library | ✅ Done | Full CRUD, real DB data, seeded with 7 frameworks |
| All other sections | 🟡 Mockup | Pages exist with hardcoded data |

---

## Implementation Roadmap

Ordered by **dependency** — each phase depends on the previous one being complete.

---

### Phase 1 — Frameworks (Marcos Normativos) ✅ Complete

> Foundation for all compliance logic. Everything else references frameworks.

**Module:** 2.1 Biblioteca de Marcos Normativos (`/normas-controles/biblioteca`)

- [x] Migration: `create_frameworks_table`
- [x] Model: `Framework` (extends `FrameworkSchema`)
- [x] Seeder: `FrameworkSeeder` + register in `MainSeeder`
- [x] Validator: `app/validators/framework.ts`
- [x] Service: `app/services/framework_service.ts`
- [x] Transformer: `app/transformers/framework_transformer.ts`
- [x] Controller: `app/controllers/frameworks_controller.ts`
- [x] Routes: `/normas-controles/biblioteca` → `FrameworksController`
- [x] Page: `standards-controls/library.tsx` — real DB data, full CRUD (add / edit / delete), live search + category filter

---

### ✅ Phase 2 — Internal Controls Catalog (Catálogo de Controles) — Complete

> **Depends on Phase 1** (controls are linked to frameworks).

**Module:** 2.3 Catálogo de Controles Internos (`/normas-controles/catalogo`)

- [x] Migration: `create_controls_table`
- [x] Migration: `create_control_framework_table` (many-to-many pivot)
- [x] Model: `Control` (extends `ControlSchema`, computed `code` + `frameworkList`)
- [x] Seeder: `ControlSeeder` (12 sample controls) + registered in `MainSeeder`
- [x] Validator: `app/validators/control.ts`
- [x] Service: `app/services/control_service.ts`
- [x] Transformer: `app/transformers/control_transformer.ts`
- [x] Controller: `app/controllers/controls_controller.ts`
- [x] Routes: `/normas-controles/catalogo` → `ControlsController` (GET/POST/PUT/DELETE)
- [x] Page: `standards-controls/catalog.tsx` — real DB data, full CRUD (add / edit / delete), live search + status filter

---

### ➡️ Phase 3 — Control–Framework Mapping ← **NEXT STEP**

> **Depends on Phase 1 & 2**.

**Module:** 2.2 Mapeo de Controles (`/normas-controles/mapeo`)

- [ ] Service: add mapping methods to `ControlService` / `FrameworkService`
- [ ] Controller: `ControlsController` or dedicated `MappingController` to serve mapping data
- [ ] Page: `standards-controls/mapping.tsx` — live matrix view (controls × frameworks)

> **Note on type generation:** There is no `node ace generate:types` command in AdonisJS v7.
> The `.adonisjs/server/controllers.ts` and `.adonisjs/client/data.d.ts` files are auto-regenerated
> when the dev server starts (`node ace serve --hmr`) or `node ace build` runs.
> After adding a new controller or transformer, manually add entries to those files
> until the next server restart regenerates them automatically.

---

### Phase 4 — Risk Evaluations & Mitigation Plans

> **Depends on Phase 2** (evaluations link to controls).
> Base Risks module already exists; this adds structured evaluations + mitigation actions.

**Modules:** 3.2 Evaluación de Riesgos, 3.3 Plan de Mitigación

- [ ] Migration: `create_risk_evaluations_table`
- [ ] Migration: `create_mitigation_actions_table`
- [ ] Models: `RiskEvaluation`, `MitigationAction`
- [ ] Seeders
- [ ] Validators, Services, Transformers, Controllers
- [ ] Routes: wire evaluation + mitigation pages to controllers
- [ ] Pages: `risks/evaluation.tsx`, `risks/mitigation.tsx` — real data + CRUD

---

### Phase 5 — Audits, Findings & Test Programs

> **Depends on Phase 2** (audits scope to controls/frameworks).

**Module:** 4. Auditorías y Revisiones

- [ ] Migration: `create_audits_table`
- [ ] Migration: `create_audit_findings_table`
- [ ] Migration: `create_audit_tests_table`
- [ ] Models: `Audit`, `AuditFinding`, `AuditTest`
- [ ] Seeders
- [ ] Validators, Services, Transformers, Controllers
- [ ] Routes: wire audit, findings and tests pages to controllers
- [ ] Pages: `audits.tsx`, `audits/plan.tsx`, `audits/findings.tsx`, `audits/tests.tsx`

---

### Phase 6 — Evidence Repository & Policies

> **Depends on Phase 2 & 5** (evidence links to controls and audits).

**Module:** 5. Evidencias y Documentos

- [ ] Migration: `create_evidence_table`
- [ ] Migration: `create_policies_table`
- [ ] Models: `Evidence`, `Policy`
- [ ] Seeders
- [ ] Validators, Services, Transformers, Controllers
- [ ] Routes: wire evidence + policies pages to controllers
- [ ] Pages: `evidence.tsx`, `evidence/repository.tsx`, `evidence/policies.tsx`, `evidence/bulk-upload.tsx`

---

### Phase 7 — Tasks & Workflows

> **Depends on Phase 2, 4, 5** (tasks link to controls, risks, audits).

**Module:** 6. Tareas y Flujos de Trabajo

- [ ] Migration: `create_tasks_table`
- [ ] Migration: `create_workflow_templates_table`
- [ ] Migration: `create_workflow_steps_table`
- [ ] Models: `Task`, `WorkflowTemplate`, `WorkflowStep`
- [ ] Seeders
- [ ] Validators, Services, Transformers, Controllers
- [ ] Routes: wire task-management + workflow-designer + recurring-tasks pages to controllers
- [ ] Pages: `tasks-workflows.tsx`, sub-pages

---

### Phase 8 — Reports

> **Depends on Phase 3–7** (reports aggregate data from all modules).

**Module:** 7. Informes

- [ ] Migration: `create_report_definitions_table`
- [ ] Migration: `create_scheduled_reports_table`
- [ ] Models: `ReportDefinition`, `ScheduledReport`
- [ ] Services: data aggregation queries
- [ ] Controllers
- [ ] Routes: wire report pages to controllers
- [ ] Pages: `reports.tsx`, `reports/library.tsx`, `reports/creator.tsx`, `reports/scheduled.tsx`

---

### Phase 9 — Admin: Organization & Activity Logs

> **Depends on Phase 1–8** (logs reference all entities).

**Module:** 8.2 Configuración de la Organización, 8.3 Registros de Actividad

- [ ] Migration: `create_organization_config_table`
- [ ] Migration: `create_activity_logs_table`
- [ ] Models: `OrganizationConfig`, `ActivityLog`
- [ ] Services, Transformers, Controllers
- [ ] Routes: wire organization + logs pages to controllers
- [ ] Pages: `administration/organization.tsx`, `administration/logs.tsx`

---

## Key Conventions (AdonisJS v7)

- Models extend the generated `XxxSchema` class from `database/schema.ts` (never `BaseModel` directly)
- Always run `node ace migration:run` after adding migrations to regenerate `database/schema.ts`
- Controllers are thin: validate → service → transform → respond
- Transformers serialize Luxon `DateTime` with `.toISO()`; never expose `password`
- Validators use `vine.create()` with `vine.compile()` for reusable validators
- Routes use Spanish kebab-case URLs (`.as('module.action')` names)
- Seeders always use `updateOrCreate` / `updateOrCreateMany` for idempotency
- Frontend pages use `InertiaProps<{ prop: Data.Xxx[] }>` for typed props
