import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { envConfig } from "../config/envConfig.js";

const connectionString = envConfig.DATABASE_URL;

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);

// TEACHER FIX 3: Initialize the client
const prisma = new PrismaClient({ adapter });

// TEACHER FIX 4: Use "export default" so your other files can import it easily
export default prisma;
