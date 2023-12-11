import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { connectDB } from "@/util/database.js";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

export const authOptions = {
    // providers 안에 구현하고 싶은 방식 기입
    providers: [
        // github 소셜로그인 기능
        GithubProvider({
            // Github에서 발급받은ID
            clientId: '188b28c419f2b3ecaf6e',
            // Github에서 발급받은Secret
            clientSecret: 'c45dd92c148aa66cffd30c8ca29827506701e73c',
        }),

        // 아이디/비번으로 로그인 기능 - CredentialsProvider()
        CredentialsProvider({
            //1. 로그인페이지 폼 자동생성해주는 코드 
            name: "credentials",
              credentials: {
                // 로그인페이지에 들어갈 인풋은 우리가 설정해줘야 함
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },
      
            //2. 로그인요청시 실행되는코드
            //직접 DB에서 아이디,비번 비교하고 
            //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
            async authorize(credentials) {
              let db = (await connectDB).db('forum');
              let user = await db.collection('user_cred').findOne({email : credentials.email})
              if (!user) {
                console.log('해당 이메일은 없음');
                return null
              }
              const pwcheck = await bcrypt.compare(credentials.password, user.password);
              if (!pwcheck) {
                console.log('비번틀림');
                return null
              }
              return user
            }
        })
    ],
    //3. jwt 써놔야 잘됩니다 + jwt 만료일설정
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60 //30일
    },

    //4. jwt 만들 때 실행되는 코드 
    callbacks: {
        //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
        jwt: async ({ token, user }) => {
            if (user) {
                //jwt에 기입할 정보
                token.user = {};
                token.user.name = user.name
                token.user.email = user.email
            }
            return token;
        }, 
        //5. 유저 세션이 조회될 때 마다 실행되는 코드
        session: async ({ session, token }) => {
            session.user = token.user; // 컴포넌트 안에 보여줄 유저정보
            return session;
        },
    },

    // jwt생성시쓰는암호
    secret : 'dlekal1234', // secret은 .env 파일 따로 만드는 게 좋음.
    adapter: MongoDBAdapter(connectDB),
};
export default NextAuth(authOptions); 