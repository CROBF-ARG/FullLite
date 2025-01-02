import express from "express";
import cors from "./config/cors";
import env from "./config/env";
import register from "./register";
import ApiRouter from "./shared/services/ApiRouter";
// import { listRoutes } from "./shared/utils/listRoutes";

const app = express();

app.use(cors); // Apply the CORS configuration middleware
app.use(express.json()); // Enable parsing of JSON request bodies
app.use(express.urlencoded({ extended: true })); // Enable parsing of URL-encoded request bodies with extended options
app.use(express.static(__dirname + "/public")); // Serve static files from the "public" directory

// Register all modules and start the server
register().finally(() => {
    // Add all registered routes to the Express app
    app.use(ApiRouter.getRouter());

    // Start the server and listen on the configured port
    app.listen(env.PORT, () => {
        // If you want to see all the registered routes in your app, uncomment the following line
        // listRoutes(app);
        if (env.MODE === "development") {
            console.log(`Your project is running at http://localhost:${env.PORT}`);
        }
    });
})