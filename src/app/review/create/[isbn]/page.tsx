import { getBookInfoByIsbn } from '@/lib/aladinAPI';
import ReviewCreateContainer from './ReviewCreateContainer';

export default async function Page({
  params,
}: {
  params: Promise<{ isbn: string }>;
}) {
  const realParams = await params;
  const isbn = realParams.isbn;
  const book = await getBookInfoByIsbn(isbn);

  if (!book)
    return <div className="py-20 text-center">정보를 불러올 수 없습니다.</div>;

  return <ReviewCreateContainer book={book} />;
}
