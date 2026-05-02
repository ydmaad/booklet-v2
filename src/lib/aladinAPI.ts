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
