import prisma from "../lib/db.js"; // TEACHER NOTE: Use "../" to go up from 'config' to 'src'
import colors from "colors";

/**
 * TEACHER NOTE:
 * If you see 'SyntaxError: ... does not provide an export named PrismaClient',
 * it usually means you need to run 'npx prisma generate' in your terminal.
 */
export const connectDB = async () => {
  try {
    // 1. Check for the URL in the environment
    if (!process.env.DATABASE_URL) {
      console.log("❌ Postgres Connection String Missing in .env".red.bold);
      return;
    }


    // 2. Open the connection bridge
    // prisma.$connect() is optional but good for testing the connection immediately
    await prisma.$connect();

    // 3. Health Check (Run a simple query to ensure the DB is reachable)
    const userCount = await prisma.user.count();

    console.log("-----------------------------------------------".gray);
    console.log(`✅ Database Host: ${"db.prisma.io".cyan}`);
   if (userCount) {
     console.log(
      `📊 Cloud Status: ${"Online".green.bold} (${userCount} users found)`,
    );
   }
    console.log("-----------------------------------------------".gray);
  } catch (error) {
    console.error("❌ Database Connection Error:".red.bold);
    console.log(error);

    // Safety: If the DB is down, we stop the server so we don't serve broken data
    process.exit(1);
  }
};
