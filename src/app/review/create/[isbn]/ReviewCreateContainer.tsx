'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { ReadStatus } from '@/types/aladin';
import ReviewCreateItem from '@/components/ReviewItem';

const ReviewCreateContainer = ({ book }: { book: any }) => {
  const router = useRouter();
  const supabase = createClient();
  const [status, setStatus] = useState<ReadStatus>('');
  const [stars, setStars] = useState('5');
  const [memo, setMemo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    if (!status || !memo) return alert('모든 필드를 입력해 주세요.');

    setIsSubmitting(true);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        alert('로그인이 필요한 서비스입니다.');
        return router.push('/login');
      }

      const { error } = await supabase.from('book_reviews').insert([
        {
          isbn: book.item?.[0]?.isbn13,
          title: book.item?.[0]?.title,
          author: book.item?.[0]?.author,
          cover: book.item?.[0]?.cover,
          status,
          stars: Number(stars),
          memo,
          user_id: session.user.id,
        },
      ]);

      if (error) throw error;

      alert('리뷰가 성공적으로 저장되었습니다!');
      router.push('/');
    } catch (err) {
      console.error(err);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ReviewCreateItem
      book={book}
      state={{ status, stars, memo, isSubmitting }}
      actions={{ setStatus, setStars, setMemo, handleSubmit }}
    />
  );
};

export default ReviewCreateContainer;
