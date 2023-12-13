// 댓글 서버 기능
import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
    let session = await getServerSession(req, res, authOptions);
    
    if (session != null) {
        if (req.method == "POST") {
            req.body = JSON.parse(req.body);
            let data = {
                content : req.body.comment,
                author : session.user.email,
                parent : new ObjectId(req.body._id),
                author_name : req.body.author_name
            }
    
            let db = (await connectDB).db("forum");
            db.collection('comment').insertOne(data);
            res.status(200).json('완료')
        }
    }
    
}