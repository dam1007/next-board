// 글 삭제 서버
import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb";

export default async function Delete(req, res) {
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
}