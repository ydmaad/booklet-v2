'use client';

import { FaBarcode } from 'react-icons/fa';
import Link from 'next/link';
import { useIsMounted } from '@/hooks/useIsMounted';
import { useBarcodeScanner } from '@/hooks/useBarcodeScanner';
import ScannerView from '@/components/barcode/ScannerView';

const BarcodeScanPage = () => {
  const isMounted = useIsMounted();
  const { ref, scanStatus } = useBarcodeScanner();

  if (!isMounted) return null;

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-28 space-y-12">
      {/* 헤더 섹션 */}
      <header className="flex flex-col items-center justify-center space-y-4">
        <FaBarcode className="w-32 h-32 text-brand-text" />
        <h1 className="text-5xl font-bold text-brand-text text-center">
          바코드 스캔
        </h1>
        <p className="text-2xl font-bold text-gray-500 text-center">
          책 바코드를 프레임 안에 맞춰주세요.
        </p>
      </header>

      {/* 바코드 스캔 */}
      <ScannerView videoRef={ref} scanStatus={scanStatus} />

      {/* 인식 완료 메시지 */}
      {scanStatus === 'success' && (
        <div className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md animate-bounce">
          ✅ 인식 완료! 잠시만 기다려주세요...
        </div>
      )}

      {/* 수동 입력 안내 */}
      <div className="flex flex-col items-center space-y-4 text-center">
        <p className="text-2xl font-bold text-gray-500">
          스캔에 어려움이 있나요?
        </p>
        <Link
          href="/isbn"
          className="bg-brand-deepGreen text-white text-xl px-16 py-2 rounded-lg shadow-lg shadow-brand-deepGreen/50 hover:bg-brand-deepGreen/75 transition-colors duration-200"
        >
          직접 ISBN 입력하기
        </Link>
      </div>
    </div>
  );
};

export default BarcodeScanPage;
