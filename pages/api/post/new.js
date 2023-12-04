// 글 작성 서버
import { connectDB } from "@/util/database.js";

export default async function handler(req, res) {
    
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