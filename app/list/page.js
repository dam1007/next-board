// 글 목록 페이지

import { connectDB } from "@/util/database.js";
import Link from 'next/link'

export default async function List() {
    const client = await connectDB;
    let db = client.db("forum");
    let result = await db.collection('post').find().toArray();

    return (
        <div className="list-bg">
            {result.map((element, index) =>
                <div className="list-item" key={index}>
                    <h4><Link href={"/detail/" + result[index]._id}>{result[index].title}</Link></h4>
                    <p>{result[index].content}</p>
                    <Link class="btn-edit" href={"/edit/" + result[index]._id}>수정</Link>
                </div>
            )}
        </div>
    )
}