import '@adonisjs/inertia/types'

import type React from 'react'
import type { Prettify } from '@adonisjs/core/types/common'

type ExtractProps<T> =
  T extends React.FC<infer Props>
    ? Prettify<Omit<Props, 'children'>>
    : T extends React.Component<infer Props>
      ? Prettify<Omit<Props, 'children'>>
      : never

declare module '@adonisjs/inertia/types' {
  export interface InertiaPages {
    'auth/login': ExtractProps<(typeof import('../../inertia/pages/auth/login.tsx'))['default']>
    'auth/signup': ExtractProps<(typeof import('../../inertia/pages/auth/signup.tsx'))['default']>
    'dashboard/administration': ExtractProps<(typeof import('../../inertia/pages/dashboard/administration.tsx'))['default']>
    'dashboard/administration/integrations': ExtractProps<(typeof import('../../inertia/pages/dashboard/administration/integrations.tsx'))['default']>
    'dashboard/administration/logs': ExtractProps<(typeof import('../../inertia/pages/dashboard/administration/logs.tsx'))['default']>
    'dashboard/administration/organization': ExtractProps<(typeof import('../../inertia/pages/dashboard/administration/organization.tsx'))['default']>
    'dashboard/administration/users-roles': ExtractProps<(typeof import('../../inertia/pages/dashboard/administration/users-roles.tsx'))['default']>
    'dashboard/alerts': ExtractProps<(typeof import('../../inertia/pages/dashboard/alerts.tsx'))['default']>
    'dashboard/audits': ExtractProps<(typeof import('../../inertia/pages/dashboard/audits.tsx'))['default']>
    'dashboard/audits/findings': ExtractProps<(typeof import('../../inertia/pages/dashboard/audits/findings.tsx'))['default']>
    'dashboard/audits/plan': ExtractProps<(typeof import('../../inertia/pages/dashboard/audits/plan.tsx'))['default']>
    'dashboard/audits/tests': ExtractProps<(typeof import('../../inertia/pages/dashboard/audits/tests.tsx'))['default']>
    'dashboard/evidence': ExtractProps<(typeof import('../../inertia/pages/dashboard/evidence.tsx'))['default']>
    'dashboard/evidence/bulk-upload': ExtractProps<(typeof import('../../inertia/pages/dashboard/evidence/bulk-upload.tsx'))['default']>
    'dashboard/evidence/policies': ExtractProps<(typeof import('../../inertia/pages/dashboard/evidence/policies.tsx'))['default']>
    'dashboard/evidence/repository': ExtractProps<(typeof import('../../inertia/pages/dashboard/evidence/repository.tsx'))['default']>
    'dashboard/executive-overview': ExtractProps<(typeof import('../../inertia/pages/dashboard/executive-overview.tsx'))['default']>
    'dashboard/home': ExtractProps<(typeof import('../../inertia/pages/dashboard/home.tsx'))['default']>
    'dashboard/my-tasks': ExtractProps<(typeof import('../../inertia/pages/dashboard/my-tasks.tsx'))['default']>
    'dashboard/reports': ExtractProps<(typeof import('../../inertia/pages/dashboard/reports.tsx'))['default']>
    'dashboard/reports/creator': ExtractProps<(typeof import('../../inertia/pages/dashboard/reports/creator.tsx'))['default']>
    'dashboard/reports/library': ExtractProps<(typeof import('../../inertia/pages/dashboard/reports/library.tsx'))['default']>
    'dashboard/reports/scheduled': ExtractProps<(typeof import('../../inertia/pages/dashboard/reports/scheduled.tsx'))['default']>
    'dashboard/risks': ExtractProps<(typeof import('../../inertia/pages/dashboard/risks.tsx'))['default']>
    'dashboard/risks/evaluation': ExtractProps<(typeof import('../../inertia/pages/dashboard/risks/evaluation.tsx'))['default']>
    'dashboard/risks/mitigation': ExtractProps<(typeof import('../../inertia/pages/dashboard/risks/mitigation.tsx'))['default']>
    'dashboard/risks/register': ExtractProps<(typeof import('../../inertia/pages/dashboard/risks/register.tsx'))['default']>
    'dashboard/standards-controls': ExtractProps<(typeof import('../../inertia/pages/dashboard/standards-controls.tsx'))['default']>
    'dashboard/standards-controls/catalog': ExtractProps<(typeof import('../../inertia/pages/dashboard/standards-controls/catalog.tsx'))['default']>
    'dashboard/standards-controls/library': ExtractProps<(typeof import('../../inertia/pages/dashboard/standards-controls/library.tsx'))['default']>
    'dashboard/standards-controls/mapping': ExtractProps<(typeof import('../../inertia/pages/dashboard/standards-controls/mapping.tsx'))['default']>
    'dashboard/tasks-workflows': ExtractProps<(typeof import('../../inertia/pages/dashboard/tasks-workflows.tsx'))['default']>
    'dashboard/tasks-workflows/recurring-tasks': ExtractProps<(typeof import('../../inertia/pages/dashboard/tasks-workflows/recurring-tasks.tsx'))['default']>
    'dashboard/tasks-workflows/task-management': ExtractProps<(typeof import('../../inertia/pages/dashboard/tasks-workflows/task-management.tsx'))['default']>
    'dashboard/tasks-workflows/workflow-designer': ExtractProps<(typeof import('../../inertia/pages/dashboard/tasks-workflows/workflow-designer.tsx'))['default']>
    'errors/not_found': ExtractProps<(typeof import('../../inertia/pages/errors/not_found.tsx'))['default']>
    'errors/server_error': ExtractProps<(typeof import('../../inertia/pages/errors/server_error.tsx'))['default']>
    'home': ExtractProps<(typeof import('../../inertia/pages/home.tsx'))['default']>
  }
}
