'use client';

import Image from 'next/image';
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
      <Link href="/" className="cursor-pointer">
        <Image
          src="/title.png"
          alt="title"
          width={120}
          height={56}
          className="object-contain"
          priority
        />
      </Link>

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
            <button onClick={handleLogout} className="ml-5 text-lg">
              로그아웃
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
