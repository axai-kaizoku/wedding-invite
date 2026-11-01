import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center p-6 text-center">
      <div>
        <h1 className="text-5xl">Lost on the way?</h1>
        <Link href="/" className="btn mt-6">
          Back to the invitation
        </Link>
      </div>
    </main>
  );
}
