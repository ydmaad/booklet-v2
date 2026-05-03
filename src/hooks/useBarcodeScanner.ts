'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useZxing } from 'react-zxing';
import { BEEP_SOUND } from '@/constants/assets';

export const useBarcodeScanner = () => {
  const [scanStatus, setScanStatus] = useState<'success' | 'error' | null>(
    null
  );
  const [isScanning, setIsScanning] = useState(true);
  const router = useRouter();

  const playBeep = () => {
    const audio = new Audio(BEEP_SOUND);
    audio.play().catch((e) => console.error('Audio play failed:', e));
  };

  const { ref } = useZxing({
    constraints: {
      video: {
        facingMode: 'environment',
        width: { ideal: 1920 },
        height: { ideal: 1080 },
      },
    },
    onResult(result) {
      if (!isScanning) return;
      const code = result.getText();

      if (code.length === 13 && /^\d{13}$/.test(code)) {
        setIsScanning(false);
        setScanStatus('success');
        playBeep();
        setTimeout(() => router.push(`/review/create/${code}`), 1500);
      }
    },
  });

  return { ref, scanStatus };
};
