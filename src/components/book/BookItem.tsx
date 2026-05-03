import { Book } from '@/types/aladin';
import Image from 'next/image';

interface BookItemProp {
  book: Book;
}

const BookItem = ({ book }: BookItemProp) => {
  return (
    <div className="w-[150px] hover:shadow-lg transition-shadow duration-200">
      <div className="relative w-full h-52">
        <Image
          src={book.cover}
          alt={book.title}
          fill
          sizes="150px"
          className="object-contain"
        />
      </div>
      <div className="text-lg font-bold truncate pt-3">{book.title}</div>
      <div className="truncate">{book.author}</div>
    </div>
  );
};

export default BookItem;
