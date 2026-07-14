// app/playground/page.tsx
"use client";

import { Suspense } from "react";
import PlaygroundContent from "./PlaygroundContent";

export default function PlaygroundPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs font-medium text-gray-400">Loading Playground Environment...</div>}>
      <PlaygroundContent />
    </Suspense>
  );
}