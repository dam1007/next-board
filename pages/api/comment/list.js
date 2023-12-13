// 댓글 조회 서버
import { connectDB } from "@/util/database.js";
import { ObjectId } from "bson"

export default async function handler(req, res) {
    if (req.method == 'GET') {
        let db = (await connectDB).db("forum");
        let result = await db.collection('comment').find({parent: new ObjectId(req.query.id)}).toArray();
        console.log(result);
        res.status(200).json(result);
    }
}