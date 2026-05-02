'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const RANDOM_BACKGROUND = [
  '/main_hero_2.jpg',
  '/main_hero_3.jpg',
  '/main_hero_4.jpg',
];

const MainHero = () => {
  const [selectedBG, setSelectedBG] = useState<string>('');

  useEffect(() => {
    // Next.js는 서버에서 먼저 HTML을 만들고, 이후 브라우저에서 다시 렌더링(hydration)한다.
    // 이때 Math.random() 같은 값이 서버와 클라이언트에서 다르면
    // HTML이 서로 달라져 hydration mismatch 에러가 발생한다.
    // 따라서 랜덤 값은 서버에서 실행되면 안 되고,
    // 반드시 클라이언트에서만 실행되어야 한다.
    const randomIndex = Math.floor(Math.random() * RANDOM_BACKGROUND.length);
    // 여기서 setState를 사용하는 이유:
    // useEffect는 클라이언트에서만 실행되기 때문에
    // 랜덤 값을 안전하게 설정할 수 있다 (SSR과 충돌 방지)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedBG(RANDOM_BACKGROUND[randomIndex]);
  }, []);

  if (!selectedBG) return <div className="h-screen bg-stone-200" />;

  return (
    <section className="relative h-screen flex flex-col items-center justify-center w-full overflow-hidden">
      <Image
        src={selectedBG}
        alt="main hero background"
        fill
        priority
        className="object-cover -z-10"
      />
      <div className="absolute inset-0 bg-black/20 -z-10"></div>
      <p className="[text-shadow:_2px_2px_8px_rgba(0,0,0,0.6)] text-white text-5xl font-semibold mb-7 z-10">
        내가 읽은 책들을 기록해봐요!
      </p>
      <Link
        href="/barcode"
        className="bg-brand-deepGreen text-white px-4 py-2 rounded-lg shadow-lg shadow-brand-deepGreen hover:bg-brand-deepGreen/75 transition-colors duration-200 z-10"
      >
        기록하러 가기
      </Link>
    </section>
  );
};

export default MainHero;
