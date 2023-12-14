// 글 수정 페이지
import { connectDB } from "@/util/database.js";
import { ObjectId } from "mongodb"

export default async function Edit(props) {
    // console.log(props.params.id);

    let db = (await connectDB).db("forum");
    let result = await db.collection('post').findOne({_id: new ObjectId(props.params.id)});

    return (
        <div className="p-20">
            <form action="/api/post/edit" method="POST">
                {/* Next.js의 server component에선 value를 그냥 쓰면 뭐라고 하는 경우가 있음. defaultValue 사용하기 */}
                <input name="title" type="text" placeholder="제목" defaultValue={result.title}/>
                <textarea name="content" placeholder="내용" defaultValue={result.content}/>
                <input name="_id" type="hidden" placeholder="제목" defaultValue={result._id}/>
                <button type="submit">저장</button>
            </form>
        </div>
    )
}