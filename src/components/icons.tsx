import Image from "next/image";

type IconProps = {
  src: string;
  alt: string;
  size?: number;
};

export function Icon({ src, alt, size = 32 }: IconProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className="object-contain"
    />
  );
}
