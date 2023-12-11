import { connectDB } from "@/util/database.js";
const { MongoClient } = require('mongodb');
import { ObjectId } from "bson"
import Comment from "./Comment";

// 상품 상세페이지
export default async function Detail(props) {

    const db = (await connectDB).db("forum");
    let result = await db.collection("post").findOne({_id: new ObjectId(props.params.id)});

    return (
        <div>
            <h4>상세페이지</h4>
            <h5>{result.title}</h5>
            <p>{result.content}</p>
            <Comment props={result._id.toString()} />
        </div>
    )
}