import { Hono } from "hono";
import type { createAdminRequest } from "../../models/admin/admin-model.js";
import { adminService } from "../../services/admin/admin-service.js";
import {prisma} from "../../applications/database.js";

export const adminController = new Hono();

/**
 * CREATE ADMIN
 * POST /api/admin
 */
adminController.post("/api/admin", async (c) => {
  let request: createAdminRequest;

  try {
    request = await c.req.json();
  } catch {
    return c.json(
      { error: "Invalid or empty JSON body" },
      400
    );
  }

  const response = await adminService.createAdmin(request);
  return c.json(response, 201);
});

/**
 * LIST ADMIN
 * GET /api/admin
 */
// adminController.get("/api/admin", async (c) => {
//   const response = await adminService.getAdmins();
//   return c.json(response);
// });

