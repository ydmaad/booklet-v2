// 베스트셀러 정보를 가져오는 함수
export const getBestsellers = async () => {
  const TTB_KEY = process.env.ALADIN_API_KEY;
  if (!TTB_KEY) {
    console.error('알라딘 API 키가 환경변수에 없습니다.');
    return [];
  }
  const url = `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${TTB_KEY}&QueryType=Bestseller&MaxResults=10&start=1&SearchTarget=Book&output=js&Version=20131101`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`API 호출 실패: ${res.status}`);
    }
    const data = await res.json();
    return data.item || [];
  } catch (error) {
    console.error('베스트셀러 데이터 패치 에러:', error);
    return [];
  }
};

// ISBN으로 책 정보를 가져오는 함수
export const getBookInfoByIsbn = async (isbn: string) => {
  const TTB_KEY = process.env.ALADIN_API_KEY; // 서버 사이드에서만 사용

  if (!TTB_KEY) {
    console.error('알라딘 API 키가 없습니다.');
    return null;
  }

  const url = `http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${TTB_KEY}&itemIdType=ISBN13&ItemId=${isbn}&output=js&Version=20131101&OptResult=ebookList,usedList,reviewList`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 86400 }, // 책 상세 정보는 자주 안 변하므로 24시간 캐싱
    });

    if (!res.ok) throw new Error(`상세 정보 호출 실패: ${res.status}`);

    const data = await res.json();
    // 알라딘 상세조회는 item 배열로 결과를 주므로 첫 번째 요소를 반환
    return data.item ? data.item[0] : null;
  } catch (error) {
    console.error('책 상세 데이터 패치 에러:', error);
    return null;
  }
};
