import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

function ResendTimer({ onTimerEnd }: { onTimerEnd: () => void }) {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimerEnd();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimerEnd]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-center text-sm text-gray-600">
      <Clock className="w-4 h-4 mr-1" />
      <span>Resend available in {formatTime(timeLeft)}</span>
    </div>
  );
}

export default ResendTimer;
