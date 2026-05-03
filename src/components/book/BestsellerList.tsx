'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Book } from '@/types/aladin';
// Swiper CSS imports
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import BookItem from './BookItem';

interface BestsellerListProps {
  books: Book[]; // 서버(page.tsx)에서 넘겨줄 책 데이터 배열
}

const BestsellerList = ({ books }: BestsellerListProps) => {
  return (
    <div className="w-full mx-auto">
      <div className="mt-16 text-center mx-auto">
        <h1 className="py-6 text-3xl font-bold text-gray-700">
          주간 베스트 셀러
        </h1>
      </div>

      {books && books.length > 0 ? (
        <Swiper
          slidesPerView={5}
          spaceBetween={100}
          loop={true}
          navigation={true}
          modules={[Navigation]}
          // 기존 w-[1200px] 유지.
          // 만약 화면이 줄어들 때 깨진다면 나중에 max-w-[1200px] w-full 로 반응형을 고려해 볼 수도 있어!
          className="w-[1200px]"
        >
          {books.map((book) => (
            <SwiperSlide key={book.isbn13}>
              <BookItem book={book} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="py-10 text-center text-gray-500">
          베스트셀러를 불러오지 못했습니다.
        </div>
      )}
    </div>
  );
};

export default BestsellerList;
