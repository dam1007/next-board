// 좋아요 기능 서버
import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
    let db = (await connectDB).db("forum");

    if (req.method == "POST") {
        req.body = JSON.parse(req.body);

        let session = await getServerSession(req, res, authOptions);
        let result = await db.collection('post_like').find({user_email : session.user.email, content_id : new ObjectId(req.body.id)}).toArray();
        
        // 한 아이디 중복 좋아요 방지
        if (result.length == 0) {
            db.collection('post_like').insertOne({user_id: session.user.name, user_email : session.user.email, content_id: new ObjectId(req.body.id)});
        }

        let data = await db.collection('post_like').find({content_id : new ObjectId(req.body.id)}).toArray();
        // console.log(data);
        res.status(200).json(data);
    }

    if (req.method == "GET") {
        // let data = await db.collection('post_like').find({}).toArray();
        let data = await db.collection('post_like').aggregate([{$group: {_id: '$content_id'}}]).toArray();
        console.log(data);
        // res.status(200).json(data);
    }
    
}