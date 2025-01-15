const fs = require('fs');
const path = require('path');

// Verifica si el primer argumento es 'module'
const command = process.argv[2]; // Primer argumento después del nombre del script

// Verifica si se pasó un nombre de módulo
const moduleName = process.argv[3]; // Nombre del módulo

// Si el comando no es 'module', muestra un error y termina
if (command !== 'module' || !moduleName) {
    console.error('Error: Invalid command or missing module name.');
    console.log('Usage: node cli.js module <name>');
    process.exit(1);
}

// Define la ruta principal donde se creará el módulo
const modulePath = path.join(__dirname, 'src', 'modules', moduleName);

// Función para crear las carpetas necesarias
const createDirectories = (basePath) => {
    const folders = [
        'routes',
        'controllers',
        'middlewares',
        'services',
        'models', // Añadí models, si necesitas otra carpeta solo agrégala aquí.
        'utils',  // Puedes agregar utilidades comunes si lo deseas
    ];

    folders.forEach(folder => {
        const folderPath = path.join(basePath, folder);
        // Crea cada carpeta si no existe
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
            console.log(`Directory created: ${folderPath}`);
        }
    });
};

// Función para crear archivos básicos dentro de cada carpeta
const createBasicFiles = (basePath) => {
    // Crear archivo básico para cada carpeta
    const files = {
        routes: 'index.js', // Archivo principal de rutas
        controllers: 'index.js', // Controlador por defecto
        middlewares: 'index.js', // Middleware por defecto
        services: 'index.js', // Servicio por defecto
        models: 'index.js', // Modelo por defecto
        utils: 'index.js', // Utilidades
    };

    Object.keys(files).forEach(folder => {
        const filePath = path.join(basePath, folder, files[folder]);
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, `// ${folder.charAt(0).toUpperCase() + folder.slice(1)} module\n`);
            console.log(`File created: ${filePath}`);
        }
    });
};

// Crear el módulo
try {
    if (!fs.existsSync(modulePath)) {
        fs.mkdirSync(modulePath, { recursive: true });
        console.log(`Module directory created: ${modulePath}`);

        // Crear las carpetas dentro del módulo
        createDirectories(modulePath);

        // Crear archivos básicos dentro de cada carpeta
        createBasicFiles(modulePath);

        console.log(`Module "${moduleName}" has been successfully created!`);
    } else {
        console.error(`Error: Module "${moduleName}" already exists.`);
    }
} catch (error) {
    console.error('An error occurred:', error);
    process.exit(1);
}
