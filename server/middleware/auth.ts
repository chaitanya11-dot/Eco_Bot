import { Request, Response, NextFunction } from "express";

const ADMIN_SECRET = "ecobot-admin-secret-key-2026";

export function adminAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const adminKey = req.headers["x-admin-key"];
  
  if (adminKey === ADMIN_SECRET) {
    return next();
  }
  
  return res.status(401).json({ error: "Access Denied: Invalid or missing administrator credentials" });
}
