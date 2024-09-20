import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default{
    port:process.env.PORT,
    dataBaseUrl:process.env.DATABASE_URL,
    nodeEnv:process.env.NODE_ENV,
    secretKey:process.env.SECRETE_KEY,
    expireIn:process.env.EXPIRE_IN
}