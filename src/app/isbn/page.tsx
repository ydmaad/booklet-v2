'use client';

import { useState } from 'react';
import { BsKeyboard } from 'react-icons/bs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useIsMounted } from '@/hooks/useIsMounted';

const IsbnInputPage = () => {
  const [isbn, setIsbn] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const isMounted = useIsMounted();

  // 입력 값 핸들링 (숫자만 입력 가능하도록 제어)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setIsbn(value);
    if (value.trim() !== '') setErrorMessage('');
  };

  // 폼 제출 핸들링
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isbn.trim() === '') {
      setErrorMessage('올바른 번호를 입력해주세요.');
      return;
    }

    // ISBN 길이에 따른 추가 검증 로직(10자리 또는 13자리)
    if (isbn.length !== 10 && isbn.length !== 13) {
      setErrorMessage('ISBN은 10자리 또는 13자리여야 합니다.');
      return;
    }

    router.push(`/review/create/${isbn}`);
  };

  if (!isMounted) return null;

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-28 space-y-12 px-4">
      {/* 상단 아이콘 및 타이틀 */}
      <header className="flex flex-col items-center justify-center space-y-4">
        <BsKeyboard className="w-32 h-32 text-brand-text" />
        <h1 className="text-5xl font-bold text-brand-text">직접 입력</h1>
        <p className="text-2xl font-bold text-gray-500 text-center">
          책의 ISBN 번호를 입력하세요
        </p>
      </header>

      {/* 입력 폼 섹션 */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-8 w-full max-w-[400px]"
      >
        <div className="flex flex-col space-y-2">
          <label htmlFor="isbn-input" className="text-gray-500 font-bold ml-1">
            ISBN (10자리 또는 13자리)
          </label>
          <input
            id="isbn-input"
            type="text"
            value={isbn}
            onChange={handleInputChange}
            placeholder="예: 9788925588735"
            className={`text-gray-800 text-xl text-center w-full py-4 rounded-lg shadow-lg transition-all duration-200 border-2 focus:outline-none ${
              errorMessage
                ? 'border-red-500 shadow-red-100'
                : 'border-transparent focus:border-brand-deepGreen shadow-brand-deepGreen/30'
            }`}
          />
          {errorMessage && (
            <p className="text-red-500 text-sm font-medium ml-1 animate-pulse">
              {errorMessage}
            </p>
          )}
        </div>

        {/* 버튼 그룹 */}
        <div className="flex flex-col space-y-3">
          <button
            type="submit"
            className="bg-brand-deepGreen text-white text-xl w-full py-4 rounded-lg shadow-lg shadow-gray-400 hover:bg-brand-deepGreen/75 transition-colors duration-200 font-bold"
          >
            책 찾기
          </button>

          <Link
            href="/"
            className="bg-white border border-gray-200 text-gray-600 text-xl text-center w-full py-4 rounded-lg shadow-lg shadow-gray-200 hover:bg-gray-50 transition-colors duration-200"
          >
            취소
          </Link>
        </div>
      </form>
    </div>
  );
};

export default IsbnInputPage;
