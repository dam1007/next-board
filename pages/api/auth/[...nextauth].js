import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { connectDB } from "@/util/database.js";

export const authOptions = {
    // providers 안에 구현하고 싶은 방식 기입
    providers: [
        GithubProvider({
            // Github에서 발급받은ID
            clientId: '188b28c419f2b3ecaf6e',
            // Github에서 발급받은Secret
            clientSecret: 'c45dd92c148aa66cffd30c8ca29827506701e73c',
        }),
    ],
    // jwt생성시쓰는암호
    secret : 'dlekal1234',
    adapter: MongoDBAdapter(connectDB),
};
export default NextAuth(authOptions); 