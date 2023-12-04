// 신규 글 작성 페이지

export default function Write() {
    return (
        // input에 name값 없으면 서버에서 req.body 콘솔 시 빈 객체 찍힘.
        <div className="p-20">
            <form action="/api/post/new" method="POST">
                <input name="title" type="text" placeholder="제목"></input>
                <textarea name="content" placeholder="내용"></textarea>
                <button type="submit">저장</button>
            </form>
        </div>
    )
}