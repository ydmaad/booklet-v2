'use client';

import { useRouter } from 'next/navigation';
import { IoBookOutline } from 'react-icons/io5';
import InputField from '@/components/InputField';
import { ReadStatus } from '@/types/aladin';
import Image from 'next/image';

interface ReviewItemProps {
  book: any;
  state: {
    status: ReadStatus;
    stars: string;
    memo: string;
    isSubmitting: boolean;
  };
  actions: {
    setStatus: (val: ReadStatus) => void;
    setStars: (val: string) => void;
    setMemo: (val: string) => void;
    handleSubmit: () => void;
  };
}

const ReviewItem = ({ book, state, actions }: ReviewItemProps) => {
  const router = useRouter();

  const statusColors: Record<Exclude<ReadStatus, ''>, string> = {
    '📘 읽고 싶은': 'text-pink-800',
    '📖 읽는 중': 'text-blue-800',
    '✅ 읽음': 'text-green-800',
    '⏸ 잠시 멈춤': 'text-yellow-800',
    '⛔ 중단': 'text-red-800',
  };

  const bookData = book.item ? book.item[0] : book; // 알라딘 데이터 구조에 맞게 접근

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* 헤더 섹션 */}
      <div className="flex flex-col items-center text-center py-10">
        <IoBookOutline className="w-28 h-28" />
        <p className="text-5xl font-bold text-brand-text">Book Review</p>
        <p className="text-2xl font-semibold text-gray-500 mt-4">
          내가 읽은 책의 느낀점, 인상깊은 문장, 새로 알게된 정보 등을 작성하세요
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-20 justify-center py-10">
        <div className="w-[350px] h-[500px] border bg-gray-50 flex-shrink-0 relative overflow-hidden rounded-lg">
          {bookData?.cover && (
            <Image
              src={bookData.cover}
              alt={bookData.title}
              fill
              className="object-contain"
            />
          )}
        </div>

        {/* 입력 폼 */}
        <div className="flex-1 max-w-2xl">
          <InputField label="책 제목" value={bookData?.title || ''} readOnly />
          <InputField label="저자" value={bookData?.author || ''} readOnly />
          <InputField
            label="출판사"
            value={bookData?.publisher || ''}
            readOnly
          />
          <InputField label="발행일" value={bookData?.pubDate || ''} readOnly />

          {/* 읽기 상태 선택 */}
          <div className="flex flex-row items-center gap-10 mb-5">
            <p className="text-lg w-[120px] font-medium">읽기 상태</p>
            <select
              onChange={(e) => actions.setStatus(e.target.value as ReadStatus)}
              value={state.status}
              className={`border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                state.status ? statusColors[state.status] : ''
              }`}
            >
              <option value="">상태 선택</option>
              <option value="📘 읽고 싶은">📘 읽고 싶은</option>
              <option value="📖 읽는 중">📖 읽는 중</option>
              <option value="✅ 읽음">✅ 읽음</option>
              <option value="⏸ 잠시 멈춤">⏸ 잠시 멈춤</option>
              <option value="⛔ 중단">⛔ 중단</option>
            </select>
          </div>

          {/* 별점 선택 */}
          <div className="flex flex-row items-center gap-10 mb-5">
            <p className="text-lg w-[120px] font-medium">별점</p>
            <select
              value={state.stars}
              onChange={(e) => actions.setStars(e.target.value)}
              className="text-lg border py-1 px-2 rounded-lg"
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star.toString()}>
                  {'⭐️'.repeat(star)}
                </option>
              ))}
            </select>
          </div>

          {/* 메모 입력 */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-5">
            <p className="text-lg w-[120px] font-medium">한줄평/메모</p>
            <textarea
              value={state.memo}
              onChange={(e) => actions.setMemo(e.target.value)}
              placeholder="책을 읽고 느낀 점이나 기억하고 싶은 문장을 적어보세요."
              className="flex-1 w-full h-[300px] border rounded-lg p-3 text-base resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      </div>

      {/* 버튼 섹션 */}
      <div className="flex flex-row gap-10 items-center justify-center mb-40">
        <button
          onClick={() => router.back()} // Next.js 방식의 뒤로가기[cite: 1]
          className="bg-white text-gray-600 text-xl w-[130px] py-3 rounded-lg shadow-lg hover:bg-gray-100 transition-all"
        >
          취소
        </button>
        <button
          onClick={actions.handleSubmit}
          disabled={state.isSubmitting}
          className="bg-brand-deepGreen text-white text-xl w-[130px] py-3 rounded-lg shadow-lg hover:opacity-80 transition-all disabled:bg-gray-400"
        >
          {state.isSubmitting ? '저장 중...' : '확인'}
        </button>
      </div>
    </div>
  );
};

export default ReviewItem;
