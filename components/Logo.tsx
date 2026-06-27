import Image from "next/image";

export function Logo({ className = "" }: { variant?: "dark" | "light"; className?: string }) {
  return (
    <span className={`relative block aspect-square w-[72px] overflow-hidden rounded-md bg-white ${className}`}>
      <Image src="/brand/logo.png" alt="Формула Чистоти" fill priority sizes="96px" className="object-contain" />
    </span>
  );
}
