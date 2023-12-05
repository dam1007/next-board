// 글 목록 페이지

import { connectDB } from "@/util/database.js";
import ListItem from "./ListItem";

export default async function List() {
    const client = await connectDB;
    let db = client.db("forum");
    let result = await db.collection('post').find().toArray();

    return (
        <div className="list-bg">
            <ListItem result={result} />
        </div>
    )
}