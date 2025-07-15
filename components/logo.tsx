import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center gap-2 z-10 cursor-pointer hover:opacity-80 transition-opacity duration-200">
      <Image
        src="/credit-card-yellow.png"
        alt="Finance Sync Logo"
        width={24}
        height={24}
      />
      <span className="text-md font-semibold text-neutral-800 dark:text-neutral-100">
        App Name
      </span>
    </div>
  );
}
