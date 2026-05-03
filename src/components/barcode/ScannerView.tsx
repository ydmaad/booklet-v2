'use client';

import { RefObject } from 'react';

interface ScannerViewProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  scanStatus: 'success' | 'error' | null;
}

const ScannerView = ({ videoRef, scanStatus }: ScannerViewProps) => {
  return (
    <section className="relative w-[500px] h-[300px] border-2 border-stone-200 overflow-hidden rounded-lg shadow-inner bg-black">
      {/* 실제 카메라 화면 */}
      <video ref={videoRef} className="w-full h-full object-cover" />

      {/* 스캔 가이드 프레임 */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
              w-4/5 h-3/5 border-4 border-dashed pointer-events-none transition-colors duration-300
              ${
                scanStatus === 'success'
                  ? 'border-green-500'
                  : scanStatus === 'error'
                  ? 'border-red-500'
                  : 'border-white/70'
              }`}
      />

      {/* 중앙 레이저 라인 */}
      <div className="absolute top-1/2 left-0 w-full h-1 bg-red-500/80 -translate-y-1/2 shadow-[0_0_8px_red]" />
    </section>
  );
};

export default ScannerView;
