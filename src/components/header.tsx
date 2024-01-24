import Link from "next/link";

export default function Header() {
  return (
    <div className="mt-6 flex items-center justify-between">
      <Link href="/">
        <h1 className="cursor-pointer text-xl font-bold text-foreground">
          הייבן
        </h1>
      </Link>
    </div>
  );
}
