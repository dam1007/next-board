'use client'

import { useEffect } from "react"
import Link from 'next/link'

export default function ListItem({result}) {
    // 방법2) - client component에서 useEffect로 서버에 요청해 DB데이터 가져오는 코드'
    // 이 방법은 SEO를 고려한다면 좋은 선택지가 아니기 때문에 client component 
    /* useEffect(() => {
        // let result = (서버에 요청해서 DB데이터 가져오는 코드)
        let result;
    }, []) */

    // 방법1) - 부모 server component에서 얻은 result props로 받아오기
    // console.log(result.result);

    return (
        <>
            {result.map((element, index) =>
                <div className="list-item" key={index}>
                    <h4><Link href={"/detail/" + element._id}>{element.title}</Link></h4>
                    <p>{element.content}</p>
                    <Link className="btn-edit" href={"/edit/" + element._id}>수정</Link>
                    <button className="btn_del" onClick={e => {
                        // fetch로 데이터 보내는 방법1) - POST
                        fetch('/api/post/delete', {
                            method: 'DELETE',
                            // POST 요청 시 데이터 전달할 때 객체나 배열은 JSON.stringify 꼭 써줘야 함.
                            body: JSON.stringify(element._id)
                        }).then((res) => {
                            if (res.status == 200) {
                                return res.json();
                            } else {
                                // 서버가 에러코드 전송 시 실행할 코드
                            }
                        }).then(result => {
                            // 성공 시 실행할 코드
                            e.target.parentElement.style.opacity = 0;
                            setTimeout(() => {
                                e.target.parentElement.style.display = 'none';
                            }, 1000)
                        }).catch(error => {
                            // 인터넷 문제로 실패 시 실행할 코드
                            console.log(error);
                        });

                        // fetch로 데이터 보내는 방법2) - GET / query String
                        // fetch('/api/test?데이터이름=값')
                        // fetch(`/api/post/delete?_id=${element._id}`)

                        // fetch로 데이터 보내는 방법3) - GET / URL parameter 문법
                        // 아무 문자나 입력했을 때 서버 기능 가능
                        // fetch('/api/abc/kim')
                    }}>삭제</button>
                </div>
            )}
        </>
    )
}