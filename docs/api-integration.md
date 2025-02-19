# Guía de Integraciones y API Externa

## Arquitectura Híbrida

El sistema utiliza un enfoque híbrido para las operaciones:

1. **Server Actions (Operaciones Principales)**
   - Todas las operaciones de la aplicación web principal
   - CRUD de tickets y usuarios
   - Operaciones internas del sistema

2. **API REST (Integraciones Externas)**
   - Webhooks para servicios externos
   - Acceso para aplicaciones de terceros
   - Integraciones con otros sistemas

## Server Actions

### Operaciones de Tickets
```typescript
// actions/tickets.ts
'use server'

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const ticketSchema = z.object({
  title: z.string().min(5),
  description: z.string(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
  categoryId: z.number()
});

export async function createTicket(formData: FormData) {
  const data = ticketSchema.parse({
    title: formData.get('title'),
    description: formData.get('description'),
    priority: formData.get('priority'),
    categoryId: Number(formData.get('categoryId'))
  });

  const ticket = await prisma.ticket.create({
    data: {
      ...data,
      creatorId: auth().userId
    }
  });

  // Notificar a servicios externos
  await notifyExternalServices(ticket);
  revalidatePath('/tickets');
}
```

### Uso en Componentes
```typescript
// components/TicketForm.tsx
'use client'

export function TicketForm() {
  return (
    <form action={createTicket}>
      <input name="title" />
      <textarea name="description" />
      <select name="priority">
        <option value="LOW">Baja</option>
        <option value="MEDIUM">Media</option>
        <option value="HIGH">Alta</option>
        <option value="URGENT">Urgente</option>
      </select>
      <button type="submit">Crear Ticket</button>
    </form>
  );
}
```

## API Externa (Para Integraciones)

### Endpoints de Integración

#### Webhook Receiver
```typescript
// app/api/webhooks/route.ts
export async function POST(req: Request) {
  const body = await req.json();
  const signature = req.headers.get('x-signature');
  
  if (!verifySignature(body, signature)) {
    return new Response('Invalid signature', { status: 401 });
  }

  await processWebhookEvent(body);
  return new Response('OK', { status: 200 });
}
```

#### API para Terceros
```typescript
// app/api/external/tickets/route.ts
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const apiKey = req.headers.get('x-api-key');
  
  if (!await validateApiKey(apiKey)) {
    return new Response('Invalid API key', { status: 401 });
  }

  const tickets = await prisma.ticket.findMany({
    where: {
      status: searchParams.get('status'),
      priority: searchParams.get('priority')
    },
    take: 10,
    skip: 0
  });

  return Response.json({ data: tickets });
}
```

## Integraciones

### Slack
```typescript
// lib/integrations/slack.ts
export async function notifySlackChannel(ticket: Ticket) {
  const blocks = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Nuevo Ticket:* ${ticket.title}`
      }
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: `*Prioridad:*\n${ticket.priority}`
        },
        {
          type: "mrkdwn",
          text: `*Categoría:*\n${ticket.category.name}`
        }
      ]
    }
  ];

  await slack.chat.postMessage({
    channel: SLACK_CHANNEL,
    blocks,
    text: `Nuevo ticket: ${ticket.title}`
  });
}
```

### Microsoft Teams
```typescript
// lib/integrations/teams.ts
export async function notifyTeamsChannel(ticket: Ticket) {
  const card = {
    "@type": "MessageCard",
    "@context": "https://schema.org/extensions",
    title: `Nuevo Ticket: ${ticket.title}`,
    sections: [
      {
        facts: [
          {
            name: "Prioridad",
            value: ticket.priority
          },
          {
            name: "Categoría",
            value: ticket.category.name
          }
        ]
      }
    ]
  };

  await fetch(TEAMS_WEBHOOK_URL, {
    method: 'POST',
    body: JSON.stringify(card)
  });
}
```

## Seguridad

### API Keys
```typescript
// lib/auth/api-keys.ts
interface ApiKeyConfig {
  key: string;
  allowedOperations: string[];
  rateLimit: {
    window: number;
    max: number;
  };
}

export async function validateApiKey(key: string): Promise<boolean> {
  const apiKey = await prisma.apiKey.findUnique({
    where: { key }
  });
  
  return !!apiKey && !apiKey.revoked;
}
```

### Rate Limiting
```typescript
// middleware.ts
import { rateLimit } from '@/lib/rate-limit';

export async function middleware(req: Request) {
  if (req.url.includes('/api/external')) {
    const apiKey = req.headers.get('x-api-key');
    const limiter = await rateLimit.check(apiKey);
    
    if (!limiter.success) {
      return new Response('Too Many Requests', { status: 429 });
    }
  }
}
```

## Webhooks

### Configuración
```typescript
// lib/webhooks/config.ts
interface WebhookConfig {
  url: string;
  events: string[];
  secret: string;
  retryCount: number;
}

export async function registerWebhook(config: WebhookConfig) {
  return prisma.webhook.create({
    data: {
      url: config.url,
      events: config.events,
      secret: config.secret
    }
  });
}
```

Esta arquitectura híbrida nos permite:
1. Usar Server Actions para operaciones internas eficientes
2. Mantener una API REST para integraciones externas
3. Proporcionar webhooks para notificaciones en tiempo real
4. Asegurar la escalabilidad y mantenibilidad del sistema