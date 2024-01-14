import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class DB extends PrismaClient {
    constructor() {
        super();
    }
}


export default new DB;