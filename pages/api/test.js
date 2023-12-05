// 서버 테스트
// import { connectDB } from "@/util/database.js";

export default async function handler(req, res) {
    console.log(req.query);
    /* if (req.method == "POST") {
        let db = (await connectDB).db("forum");
        db.collection('post').insertOne(req.body);
        res.redirect(302, '/list');
    } */
    
}