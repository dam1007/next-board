// 회원가입 서버
import { connectDB } from "@/util/database.js";
import bcrypt from 'bcrypt'

export default async function handler(req, res) {
    if (req.method == 'POST') {
        // 비번 암호화 - bcrypt 라이브러리 설치해 .hash() 사용
        let hash = await bcrypt.hash(req.body.password, 10);
        req.body.password = hash;

        // 이메일 중복 유효성 체크, 빈칸 유효성 체크 필요

        let db = (await connectDB).db("forum");
        await db.collection('user_cred').insertOne(req.body);
        res.status(200).json('가입성공');
    }
}