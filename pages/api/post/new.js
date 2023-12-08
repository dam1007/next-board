// 글 작성 서버
import { connectDB } from "@/util/database.js";
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

export default async function handler(req, res) {
    // 서버 컴포넌트, 서버 기능 안에서 로그인된 회원 정보 아는 법
    // getServerSession() : 서버 기능 안에서 사용 시, res, req 같이 써줘야 함.
    let session = await getServerSession(req, res, authOptions);
    if (session) {
        req.body.author = session.user.email;
    }
    
    if (req.method == "POST") {
        if (req.body.title == '') {
            return res.json('제목 입력하쇼');
        } else if (req.body.content == '') {
            return res.json('내용 입력하쇼');
        }

        // DB 다운되거나 인턴세 끊길 경우 DB에 에러 생김
        // 이때 체크하고 싶으면 try, catch 사용
        try {
            let db = (await connectDB).db("forum");
            db.collection('post').insertOne(req.body);
            return res.redirect(302, '/list');
        } catch (error) {
            return res.json(error);
        }
        
    }
    
}