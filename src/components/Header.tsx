'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();

  const isMockLoggedIn = true;
  const mockProfile = { nickname: '민애' };

  const handleLogout = () => {
    console.log('로그아웃 클릭됨');
    router.push('/');
  };
  return (
    <header className="flex justify-between py-3">
      <div
        onClick={() => router.push('/')}
        className="text-xl font-bold cursor-pointer"
      >
        <img src="/title.png" alt="title" className="h-14" />
      </div>

      {/* 네비게이션 영역 */}
      <nav className="flex flex-row gap-3">
        {isMockLoggedIn ? (
          <div className="flex items-center justify-center">
            <span className="text-lg">
              <span className="font-bold text-brand-button">
                {mockProfile?.nickname}
              </span>
              <span className="text-black"> 님</span>
            </span>
            <Link href="/mypage" className="ml-5 text-lg">
              마이페이지
            </Link>
            <button onClick={handleLogout} className="ml-5">
              <p className="text-lg">로그아웃</p>
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <Link href="/login" className="text-lg">
              로그인
            </Link>
            <Link href="/register" className="ml-5 text-lg">
              회원가입
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
