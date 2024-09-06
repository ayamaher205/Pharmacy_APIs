import express from "express";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import router from "./routes/index";
import errorHandler from "./middleware/errorHandler";

const app = express();
const prisma = new PrismaClient();
const { PORT } = process.env;

const prismaClient = new PrismaClient();
export default prismaClient;

app.use(express.json());
app.use(router);
app.use(errorHandler);
app.listen(PORT, async () => {
    try {
        await prisma.$connect();
        console.log(`App is running on http://localhost:${PORT}`);
    } catch (error) {
        console.error("Failed to connect to the database:", error);
    }
});
