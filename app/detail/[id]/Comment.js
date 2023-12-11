// ajax로 댓글기능

'use client'
import { useState } from "react";

export default function Comment({props}) {
    // 유저가 입력한 값을 state에 저장해두고 쓰기
    let [comment, setComment] = useState();

    return (
        <div>
            <div>댓글 목록 보여줄 부분</div>
            <input onChange={(e) => { setComment(e.target.value) }}/>
            <button onClick={() => {
                fetch('/api/comment/new', 
                    {method : 'POST', 
                        body : JSON.stringify(
                            {comment : comment,
                                _id : props
                            }   
                        )
                    }
                )
            }}>댓글작성</button>
        </div>
    )
}