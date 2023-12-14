import { connectDB } from "@/util/database.js";
const { MongoClient } = require('mongodb');
import { ObjectId } from "mongodb"
import Comment from "./Comment";
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { notFound } from 'next/navigation';

// 상품 상세페이지
export default async function Detail(props) {

    const db = (await connectDB).db("forum");
    let result = await db.collection("post").findOne({_id: new ObjectId(props.params.id)});

    // 댓글 작성자 이름 props로 보내기
    let session = await getServerSession(authOptions);
    
    // not-found 페이지 만드는 법 2가지
    if (result == null) {
        return notFound()
    } else {
        return (
            <div>
                <h4>상세페이지</h4>
                <h5>{result.title}</h5>
                <p>{result.content}</p>
                <Comment props={{id: result._id.toString(), author_name: session.user.name}} />
            </div>
        )
    }
}