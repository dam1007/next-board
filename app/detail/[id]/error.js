// 에러 페이지 - client component만 넣을 수 있음

'use client'

export default function Error({error, reset}){
  return (
    <div>
      <h4>{error}</h4> {/* 에러 내용 알려줌 */}
      <button onClick={()=>{ reset() }}>다시시도</button>
    </div>
  )
}