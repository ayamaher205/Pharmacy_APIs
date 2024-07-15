import express from "express";
import { PrismaClient } from '@prisma/client';
const app = express();
const prisma = new PrismaClient();
const {port} = process.env;

app.listen(port,async ()=>{
    try {
        await prisma.$connect();
        console.log(`App is running on Server https`);
    } catch (error) {
        console.error('Failed to connect to the database:', error);
    }
})