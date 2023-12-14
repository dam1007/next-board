// ajax로 댓글기능

'use client'
import { useState, useEffect } from "react";

export default function Comment({props}) {
    // 유저가 입력한 값을 state에 저장해두고 쓰기
    let [comment, setComment] = useState('');
    let [data, setData] = useState([]);

    // 댓글 조회 기능 - client에서 DB 출력 사용하면 안 되므로 useEffect로 서버 요청
    useEffect(() => {
        fetch('/api/comment/list?id=' + props.id).then(result => result.json())
        .then(result => {
            setData(result);
        })
    }, [])
    
    return (
        <div>
            <ul>
            {data.map((element, index) => (
                <li key={index}>
                    <span>{element.author_name}</span>
                    <p>{element.content}</p>
                </li>
            ))}
            </ul>
            <input onChange={(e) => { setComment(e.target.value) }}/>
            <button onClick={() => {
                fetch('/api/comment/new', 
                    {method : 'POST', 
                        body : JSON.stringify(
                            {
                                comment : comment,
                                _id : props.id,
                                author_name: props.author_name
                            }   
                        )
                    }
                )
                .then((result) => {
                    fetch('/api/comment/list?id=' + props.id)
                    .then(result => result.json())
                    .then(result => {
                        setData(result);
                    })
                })
            }}>댓글작성</button>
        </div>
    )
}