# **FullLite - Minimalist Starter Template**

**FullLite** is a lightweight starter template designed to create simple web applications with a full-stack architecture. It combines a **Node.js backend with Express**, a **React-based frontend**, enabling quick and structured development.

## **Features**
- 🚀 **Backend**: Build RESTful APIs effortlessly with Express.js.
- ⚛️ **Frontend**: Modern user interfaces powered by React.
- 🔧 **Simple Setup**: Configure and deploy in just minutes.
- 📦 **Modular and Extensible**: Designed for scalability and customization.
- 🔄 **Auto Module Loader**: Automatically registers modules following directory conventions.

## **Why Choose FullLite?**
FullLite is perfect for small projects, prototypes, and simple web applications. Its minimalist setup allows you to focus on development without unnecessary complexity.

---

## **Getting Started**

### **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/CROBF-ARG/FullLite.git <project_name>
   cd <project_name>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create an `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

Your backend will run at `http://localhost:<PORT>` and the frontend will be accessible at `http://localhost:<FRONTEND_PORT>`.

---

## **Folder Structure**
Here's a simplified view of the folder structure:
```
full-lite/
│
├── src/
│   ├── modules/          # All feature modules
│   │   ├── example/
│   │   │   ├── routes/   # Routes for the module
│   │   │   │   └── index.ts
│   │   │   ├── services/ # Business logic
│   │   │   └── controllers/
│   ├── shared/           # Reusable services, utilities, and classes
│   ├── config/           # Configuration files (e.g., CORS, environment variables)
│   ├── public/           # Static files for the frontend
│   ├── register.ts       # Load modules
│   └── index.ts          # Application entry point
│
├── client/               # React frontend application
│
├── dist/                 # Compiled output
├── .env.example          # Example environment variables
└── package.json          # Project dependencies and scripts
```

---

## **Creating a Module**

Modules in FullLite follow a simple convention to enable automatic loading.

### **Step 1: Create the Module Folder**
Inside the `src/modules/` directory, create a new folder for your module:
```bash
mkdir src/modules/myModule
```

### **Step 2: Add a `routes` Folder and `index.ts` File**
In the module folder, add a `routes` folder and an `index.ts` file:
```bash
mkdir src/modules/myModule/routes
touch src/modules/myModule/routes/index.ts
```

### **Step 3: Register Routes Using `ApiRouter`**
Define your module's routes using the `ApiRouter` class:
```typescript
import ApiRouter from "../../../shared/services/ApiRouter";

ApiRouter.get("my-endpoint", (req, res) => {
    res.json({ message: "Hello from myModule!" });
});
```

### **Step 4: Automatic Loading**
By following the convention `modules/{moduleName}/routes/index.ts`, your module will automatically be loaded and its routes registered. There's no need to manually import or add routes to the main application.

---

## **How Auto Module Loading Works**

FullLite includes a `register.ts` utility that automatically detects and loads all modules:
```typescript
// src/register.ts

export default async function register(): Promise<void> {
    console.log("\n===============================");
    console.log("🌟 Starting module registration...");
    console.log("===============================\n");

    const module_dirs = readdirSync(MODULES_PATH).filter((file) => {
        const full_path = join(MODULES_PATH, file);
        return statSync(full_path).isDirectory();
    });

    if (module_dirs.length === 0) {
        console.log("⚠️ No modules found in the directory.\n");
        console.log("===============================");
        return;
    }

    for (const module_name of module_dirs) {
        try {
            const routePath = getMainRouteFile(module_name);
            console.log(`🔄 Attempting to load module: ${module_name}...`);
            await import(routePath);
            console.log(`✅ Module "${module_name}" loaded successfully!`);
        } catch (error) {
            console.log(`❌ Critical error while loading module "${module_name}".`);
            console.error(error);
        }
    }

    console.log("\n===============================");
    console.log("🎉 Module registration complete!");
    console.log("===============================\n");
}
```

This function scans the `src/modules` directory for subdirectories and loads their `routes/index.ts` files. Once all modules are loaded the server run.

---

## **Using `ApiRouter`**

The `ApiRouter` class simplifies route registration by providing a singleton router instance and chaining capabilities:
```typescript
import ApiRouter from "../shared/services/ApiRouter";

ApiRouter.get("example", (req, res) => {
    res.json({ message: "GET Example" });
});

ApiRouter.post("example", (req, res) => {
    res.json({ message: "POST Example" });
});
```

These routes are automatically prefixed with `/api/`. The main application registers all routes using:
```typescript
import ApiRouter from "./shared/services/ApiRouter";

app.use(ApiRouter.getRouter());
```

---

## **Available Scripts**

- **`npm run dev`**: Starts the application in development mode.
- **`npm run build`**: Compiles the application for production.
- **`npm start`**: Runs the compiled application in production.

---

## **Future Enhancements**
- Add middleware support for input validation (e.g., using Zod).
- Include TypeScript decorators for cleaner routing syntax.
- Provide CLI tools for module scaffolding.

---

Start building your web applications faster with FullLite!
