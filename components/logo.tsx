import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/credit-card-yellow.png"
        alt="Finance Sync Logo"
        width={24}
        height={24}
      />
      <span className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
        Finance Sync
      </span>
    </div>
  );
}
