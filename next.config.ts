import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.aladin.co.kr', // 알라딘 이미지 서버 도메인
        port: '',
        pathname: '/**', // 하위 모든 경로 허용
      },
    ],
  },
};

export default nextConfig;
