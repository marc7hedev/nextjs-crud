# Guía de Despliegue en Railway

## Preparación

1. Asegúrate de tener estas variables de entorno en Railway:
```env
DATABASE_URL=postgresql://...  # URL de la base de datos PostgreSQL
NODE_ENV=production
```

2. Configura el build command en Railway:
```bash
npm install && npx prisma generate && npm run build
```

3. Configura el start command:
```bash
npm start
```

## Pasos de Despliegue

1. **Preparar Base de Datos**
```bash
# Localmente, ejecuta:
npx prisma db push
```

2. **Verificar Build Local**
```bash
# Limpiar caché y node_modules
rm -rf .next node_modules
npm install

# Generar cliente Prisma
npx prisma generate

# Build
npm run build
```

3. **Configurar Railway CLI**
```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login
railway login

# Vincular proyecto
railway link

# Verificar variables de entorno
railway variables
```

4. **Desplegar**
```bash
# Desplegar a Railway
railway up
```

## Troubleshooting

### Error de Tipos en Pages
Si encuentras errores de tipos en las páginas de Next.js:
1. Verifica que las interfaces de props sean correctas
2. No uses Promise en tipos de params
3. Asegúrate de que todos los tipos estén importados

Ejemplo correcto:
```typescript
interface PageProps {
    params: {
        id: string;
    };
}

export default async function Page({ params }: PageProps) {
    // ...
}
```

### Errores de Prisma
Si encuentras errores relacionados con Prisma:
1. Asegúrate de generar el cliente Prisma:
```bash
npx prisma generate
```

2. Verifica que el esquema esté sincronizado:
```bash
npx prisma db push
```

### Problemas con Server Actions
Si los Server Actions no funcionan:
1. Verifica que 'use server' esté al inicio del archivo
2. Asegúrate de que el archivo esté en la carpeta correcta
3. Comprueba que las importaciones sean correctas

## Monitoreo Post-Despliegue

1. **Verificar Logs**
```bash
railway logs
```

2. **Monitorear Métricas**
- CPU Usage
- Memory Usage
- Response Times
- Error Rates

3. **Healthchecks**
```typescript
// app/api/health/route.ts
export async function GET() {
    try {
        await prisma.$queryRaw`SELECT 1`;
        return new Response('OK', { status: 200 });
    } catch (error) {
        return new Response('Error', { status: 500 });
    }
}
```

## Rollback en Caso de Problemas

1. **Revertir a Versión Anterior**
```bash
railway service rollback
```

2. **Verificar Base de Datos**
```bash
# Verificar estado de la base de datos
npx prisma db pull
```

## Mejores Prácticas

1. **Antes del Despliegue**
- Ejecutar tests
- Verificar build local
- Revisar variables de entorno

2. **Durante el Despliegue**
- Monitorear logs
- Verificar endpoints críticos
- Comprobar conexión a DB

3. **Después del Despliegue**
- Verificar funcionalidad
- Monitorear errores
- Revisar rendimiento

## Mantenimiento

1. **Actualizaciones Regulares**
```bash
# Actualizar dependencias
npm update

# Verificar vulnerabilidades
npm audit

# Aplicar fixes
npm audit fix
```

2. **Backups**
```bash
# Backup de base de datos
railway service backup create
```

3. **Monitoreo Continuo**
- Configurar alertas
- Revisar logs periódicamente
- Monitorear métricas de rendimiento