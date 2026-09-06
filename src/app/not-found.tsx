import Link from "next/link";
import { DistancePage } from "@/components/distance/page";

export default function NotFound() {
  return (
    <DistancePage>
      <span className="distance-eyebrow">404</span>
      <h1>Nothing here.</h1>
      <p className="distance-pending">This page doesn’t exist or has moved.</p>
      <div className="distance-links">
        <Link href="/">Return home</Link>
      </div>
    </DistancePage>
  );
}
