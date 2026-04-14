import { ImgHTMLAttributes } from 'react';

type AppLogoIconProps = ImgHTMLAttributes<HTMLImageElement> & {
  label?: string;
};

export default function AppLogoIcon({
  className = '',
  label = 'CHED Starterkit',
  ...props
}: AppLogoIconProps) {
  return (
    <div className="flex items-center">
      <div className="flex size-12 items-center justify-center text-sidebar-primary-foreground">
        <img
          {...props}
          className={`size-8 ${className}`}
          src="/ched_logo.png"
          alt="App Logo"
          draggable={false}
        />
      </div>

      <div className="ml-1 grid flex-1 text-left text-sm">
        <span className="mb-0.5 truncate font-semibold leading-tight">
          {label}
        </span>
      </div>
    </div>
  );
}
