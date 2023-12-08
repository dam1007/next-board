import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import LoginBtn from './LoginBtn'
import LogOutBtn from './LogOutBtn'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({ children }) {
  // 서버 컴포넌트, 서버 기능 안에서 로그인된 회원 정보 아는 법
  let session = await getServerSession(authOptions);
  // console.log(session.user);

  return (
    <html lang="en">
      <body>
        <header className="navbar">
          <Link href="/" className="logo">Applforum</Link>
          <Link href="/list">List</Link>
          {session ?
          <span>{session.user.name} <LogOutBtn /></span>
          :
          <LoginBtn />
          }
        </header>
        {children}
      </body>
    </html>
  )
}
