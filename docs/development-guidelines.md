# Guía de Desarrollo para IT Support System

## Enfoque Híbrido de Desarrollo

### Server Actions (Operaciones Principales)
```typescript
// ✅ Usar Server Actions para operaciones internas
'use server'

export async function createTicket(formData: FormData) {
  const data = validateTicketData(formData);
  const ticket = await prisma.ticket.create({ data });
  revalidatePath('/tickets');
  return ticket;
}

// ❌ No usar Server Actions para integraciones externas
export async function webhookHandler(data: WebhookData) {
  // Esto debería ser una API Route
}
```

### API Routes (Integraciones Externas)
```typescript
// ✅ Usar API Routes para integraciones
// app/api/external/tickets/route.ts
export async function GET(request: Request) {
  const apiKey = request.headers.get('x-api-key');
  // Validación y respuesta
}

// ❌ No usar API Routes para operaciones internas
export async function POST(request: Request) {
  // Esto debería ser un Server Action
}
```

## Flujos de Trabajo Git

### Ramas
```
main           # Producción
├── staging    # Pre-producción
└── develop    # Desarrollo
    ├── feature/ticket-actions    # Server Actions
    ├── feature/api-integration   # API Externa
    └── bugfix/webhook-handler    # Correcciones
```

### Convenciones de Commits
```
feat(actions): añadir createTicket server action
feat(api): añadir endpoint de tickets para externos
fix(webhook): corregir manejo de payload
docs: actualizar documentación de API
style: formatear archivos de Server Actions
refactor: optimizar validaciones
test: añadir pruebas para Server Actions
```

## Estándares de Código

### Server Actions
```typescript
// actions/tickets/create.ts
'use server'

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';

const ticketSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(10),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH'])
});

export async function createTicket(formData: FormData) {
  // 1. Validación
  const validated = ticketSchema.parse({
    title: formData.get('title'),
    description: formData.get('description'),
    priority: formData.get('priority')
  });

  // 2. Autenticación
  const session = await auth();
  if (!session) throw new Error('No autorizado');

  // 3. Operación
  const ticket = await prisma.ticket.create({
    data: {
      ...validated,
      createdById: session.user.id
    }
  });

  // 4. Revalidación
  revalidatePath('/tickets');
  
  return ticket;
}
```

### API Routes
```typescript
// app/api/external/tickets/route.ts
import { validateApiKey } from '@/lib/auth';
import { rateLimit } from '@/lib/rate-limit';

export async function GET(request: Request) {
  // 1. Autenticación
  const apiKey = request.headers.get('x-api-key');
  if (!await validateApiKey(apiKey)) {
    return new Response('Invalid API key', { status: 401 });
  }

  // 2. Rate Limiting
  const rateLimitResult = await rateLimit.check(apiKey);
  if (!rateLimitResult.success) {
    return new Response('Too Many Requests', { status: 429 });
  }

  // 3. Procesamiento
  const tickets = await getTicketsForExternal();

  // 4. Respuesta
  return Response.json({ data: tickets });
}
```

## Testing

### Server Actions
```typescript
// __tests__/actions/createTicket.test.ts
import { createTicket } from '@/actions/tickets';

describe('createTicket', () => {
  it('should create a ticket with valid data', async () => {
    const formData = new FormData();
    formData.append('title', 'Test Ticket');
    formData.append('description', 'Test Description');
    formData.append('priority', 'HIGH');

    const ticket = await createTicket(formData);
    expect(ticket).toHaveProperty('id');
  });
});
```

### API Routes
```typescript
// __tests__/api/tickets.test.ts
describe('GET /api/external/tickets', () => {
  it('should return tickets for valid API key', async () => {
    const response = await fetch('/api/external/tickets', {
      headers: {
        'x-api-key': 'valid-key'
      }
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('data');
  });
});
```

## Seguridad

### Server Actions
- Autenticación vía middleware de Next.js
- CSRF protection automática
- Validación de datos con Zod
- Permisos basados en roles

### API Externa
- API Keys con permisos granulares
- Rate limiting por key
- Validación de payload
- Logging de accesos

## Monitoreo

### Server Actions
```typescript
// lib/monitoring/actions.ts
export async function trackActionMetrics(actionName: string, duration: number) {
  await prisma.actionMetric.create({
    data: {
      name: actionName,
      duration,
      timestamp: new Date()
    }
  });
}
```

### API Externa
```typescript
// lib/monitoring/api.ts
export async function trackApiMetrics(endpoint: string, status: number) {
  await prisma.apiMetric.create({
    data: {
      endpoint,
      status,
      timestamp: new Date()
    }
  });
}
```

## Deploy y CI/CD

### GitHub Actions
```yaml
name: CI/CD
on:
  push:
    branches: [main, staging]
  pull_request:
    branches: [main, staging]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Test Server Actions
        run: npm run test:actions
      - name: Test API Routes
        run: npm run test:api
      - name: Build
        run: npm run build
```

## Mejores Prácticas

1. **Server Actions**
   - Usar para todas las operaciones internas
   - Implementar validación de datos
   - Mantener acciones pequeñas y enfocadas
   - Usar revalidatePath para actualizar cache

2. **API Externa**
   - Usar solo para integraciones externas
   - Implementar rate limiting
   - Documentar endpoints claramente
   - Versionar la API apropiadamente

3. **Desarrollo General**
   - Escribir tests para ambos tipos de operaciones
   - Mantener la separación de responsabilidades
   - Documentar cambios significativos
   - Seguir las convenciones de nombrado