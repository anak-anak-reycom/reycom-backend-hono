import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { logger } from "../applications/logging.js";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({
  adapter,
  log: [
    { emit: "event", level: "query" },
    { emit: "event", level: "error" },
    { emit: "event", level: "info" },
    { emit: "event", level: "warn" },
  ],
});

/* ======================
   Prisma Event Logger
====================== */

prisma.$on("query", (e) => {
  logger.info({
    message: "Prisma Query",
    query: e.query,
    params: e.params,
    duration: `${e.duration}ms`,
  });
});

prisma.$on("error", (e) => {
  logger.error({
    message: "Prisma Error",
    error: e.message,
    target: e.target,
  });
});

prisma.$on("info", (e) => {
  logger.info({
    message: "Prisma Info",
    info: e.message,
  });
});

prisma.$on("warn", (e) => {
  logger.warn({
    message: "Prisma Warning",
    warning: e.message,
  });
});
