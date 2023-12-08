// 글 삭제 서버
import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb";
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

export default async function Delete(req, res) {
    let session = await getServerSession(req, res, authOptions);
    if (session) {
        // 로그인 계정과 글쓴 계정 일치할 때 삭제 가능
        if (session.user.email == JSON.parse(req.body).author) {
            // 방법1) fetch/DELETE 로 데이터 가져오기
            if(req.method == 'DELETE') {
                let db = (await connectDB).db("forum");
                db.collection('post').deleteOne(
                    {_id: new ObjectId(JSON.parse(req.body))}, 
                );
                res.status(200).json('삭제완료');
            }

            // 방법2) fetch / query string으로 가져오기
            /* let db = (await connectDB).db("forum");
            db.collection('post').deleteOne(
                {_id: new ObjectId(req.query._id)}, 
            );
            res.status(200).json('삭제완료'); */

            // 방법3) fetch / URL parameter로 가져오기
            /* let db = (await connectDB).db("forum");
            db.collection('post').deleteOne(
                {_id: new ObjectId(req.query._id)}, 
            );
            res.status(200).json('삭제완료'); */

        } else {
            return res.status(500).json('불일치')
        }
    }

    
}