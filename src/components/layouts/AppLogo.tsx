import { cn } from '@/lib/utils';
import CL_Icon from '@/assets/cl_icon.png';

type AppLogoProps = {
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const sizeMap = {
  sm: 'h-12 w-12',
  md: 'h-16 w-16 sm:h-20 sm:w-20',
  lg: 'h-24 w-24 sm:h-28 sm:w-28',
};

export default function AppLogo({ alt = 'CARAT LOGIC', size = 'md', className }: AppLogoProps) {
  return (
    <img
      src={CL_Icon}
      alt={alt}
      className={cn('mx-auto object-contain', sizeMap[size], className)}
    />
  );
}