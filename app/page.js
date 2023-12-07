import { connectDB } from "@/util/database.js";

// 4. DB에서 직접 가져온 데이터 캐싱하기
// revalidate 예약변수 쓰면 페이지 단위 캐싱 가능
// 사용자가 해당 페이지 방문 시 60초 동안 페이지 캐싱
export const revalidate = 60;

export default async function Home() {

  const client = await connectDB;
  const db = client.db("forum");
  let result = await db.collection('post').find().toArray();

  // GET요청 결과 캐싱하기
  // await fetch('/URL', {cache: 'force-cache'})
  // 주의! await fetch('/URL')만 써도 캐싱됨.

  // 2. 실시간 데이터가 필요해 캐싱하면 안될 경우
  // await fetch('/URL', {cache: 'no-store'})

  // 3. 60초마다 캐싱된 데이터 갱신해줌
  // await fetch('/URL', {next : {revalidate : 60}})

  return (
    <div>{result[0].title}</div>
  )
}
