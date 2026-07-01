import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import apiRoutes from "./server/routes/apiRoutes";

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // Request logs logging middleware
  app.use((req: Request, res: Response, next: NextFunction) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
  });

  // Enable JSON request body parsing
  app.use(express.json({ limit: "10mb" }));

  // Serve API REST routes
  app.use("/api", apiRoutes);

  // Health check
  app.get("/api/health", (req: Request, res: Response) => {
    res.json({ status: "healthy", timestamp: new Date().toISOString() });
  });

  // Vite static file server / middleware configuration
  if (process.env.NODE_ENV !== "production") {
    console.log("Configuring Vite middleware in DEVELOPMENT mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving build files in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Global Exception / Error Handling middleware
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("Express Uncaught Exception Error Handler:", err);
    res.status(500).json({
      error: "Internal Server Error",
      message: err.message || "An unexpected system fault occurred",
      timestamp: new Date().toISOString()
    });
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`EcoBot Full-Stack Server booted and running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start full-stack server:", error);
});
