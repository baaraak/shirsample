import Link from "next/link";
import React from "react";

export default function logo() {
  return (
    <Link href="/">
      <a className="text-3xl tracking-wide">
        <span className="font-bold">
          <span className="">S</span>hir
        </span>
        <span className="font-light text-red-500">Sample</span>
      </a>
    </Link>
  );
}
