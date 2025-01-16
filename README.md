# **FullLite - Minimalist Starter Template**

**FullLite** es una plantilla inicial minimalista diseñada para crear aplicaciones web con una arquitectura full-stack. Combina un **backend en Node.js con Express** y un **frontend basado en React**, permitiendo un desarrollo rápido y estructurado.

## **Características**
- 🚀 **Backend**: Construye APIs RESTful fácilmente con Express.js.
- ⚛️ **Frontend**: Interfaces modernas de usuario impulsadas por React.
- 🔧 **Configuración Simple**: Configura y despliega en minutos.
- 📦 **Modular y Extensible**: Diseñado para escalabilidad y personalización.
- 🔄 **Carga Automática de Módulos**: Registra automáticamente módulos siguiendo convenciones de directorios.
- 🛠️ **CLI Integrado**: Crea módulos rápidamente desde la terminal.

---

## **Instalación**

### **Opción 1: Usando el Comando `npm create`**
Ejecuta el siguiente comando para crear un proyecto nuevo basado en FullLite:
```bash
npm create fulllite@latest
```
Esto generará automáticamente un nuevo proyecto en el directorio especificado.

### **Opción 2: Clonando el Repositorio**
1. Clona el repositorio:
   ```bash
   git clone https://github.com/CROBF-ARG/FullLite.git <project_name>
   cd <project_name>
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env`:
   ```bash
   cp .env.example .env
   ```

4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

Tu backend estará disponible en `http://localhost:<PORT>` y el frontend en `http://localhost:<FRONTEND_PORT>`.

---

## **Uso del CLI**

FullLite incluye un CLI integrado para facilitar la creación de módulos.

### **Crear un Módulo**
Ejecuta el siguiente comando:
```bash
node cli.js module <module_name>
```

Esto creará un nuevo módulo dentro de `src/modules/<module_name>`, con la siguiente estructura:
```
src/modules/<module_name>/
│
├── routes/          # Infrastructura de tu aplicación
│   └── index.ts
├── controllers/     # Lógica del controlador
├── services/        # Lógica del negocio
├── middlewares/     # Middleware personalizado
├── models/          # Modelos de datos
└── utils/           # Utilidades específicas del módulo
```

---

## **Estructura del Proyecto**

Un vistazo general de la estructura del proyecto:
```
full-lite/
│
├── src/
│   ├── modules/          # Todos los módulos de características
│   ├── shared/           # Servicios reutilizables y utilidades
│   ├── config/           # Archivos de configuración
│   ├── register.ts       # Carga automática de módulos
│   └── index.ts          # Punto de entrada de la aplicación
│
├── client/               # Aplicación frontend en React
├── dist/                 # Salida compilada
├── cli.js                # CLI para generar módulos
├── .env.example          # Variables de entorno de ejemplo
└── package.json          # Dependencias y scripts del proyecto
```

---

## **Carga Automática de Módulos**

FullLite detecta y registra automáticamente los módulos dentro de `src/modules`. Solo necesitas seguir la convención:
```
modules/<module_name>/routes/index.ts
```

Este enfoque elimina la necesidad de importar manualmente cada módulo.

---

## **Scripts Disponibles**

- **`npm run dev`**: Inicia la aplicación en modo desarrollo.
- **`npm run build`**: Compila la aplicación para producción.
- **`npm start`**: Ejecuta la aplicación compilada en producción.

---

## **Futuras Mejoras**
- Middleware para validación de entradas (p. ej., con Zod).
- Decoradores TypeScript para una sintaxis de rutas más limpia.
- Extensiones adicionales para el CLI.

---

¡Empieza a construir tus aplicaciones web más rápido con FullLite!