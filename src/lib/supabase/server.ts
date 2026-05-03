import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const createClient = async () => {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Next.js의 서버 컴포넌트는 쿠키를 읽을 수만 있고 쓸 수 없음
            // 서버 컴포넌트 렌더링 중 토큰 갱신이 발생하여 쿠키를 설정하려고 할 때
            // 발생하는 에러를 무시하기 위해 의도적으로 비워둠
            // 실제 안전한 토큰 갱신은 Middleware나 Server Actions에서 처리해야 함)
          }
        },
      },
    }
  );
};
