// app/playground/PlaygroundContent.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { SelectFilter } from '@/components/ui/SelectFilter';

interface PostItem {
  id: number;
  title: string;
  body: string;
}

export default function PlaygroundContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. useState Counter State
  const [count, setCount] = useState<number>(0);

  // 2. Controlled Input State
  const [name, setName] = useState<string>('');

  // 3. useEffect Timer State
  const [seconds, setSeconds] = useState<number>(0);

  // 4. Open API Calling States
  const [post, setPost] = useState<PostItem | null>(null);
  const [apiLoading, setApiLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // --- Effects ---
  
  // 3. Interval Timer Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  // 4. API Fetching Logic
  const fetchRandomPost = async () => {
    setApiLoading(true);
    setApiError(null);
    setPost(null);
    try {
      // Pick random IDs 1 to 100 to simulate a dynamic dynamic API response
      const randomId = Math.floor(Math.random() * 100) + 1;
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${randomId}`);
      if (!res.ok) throw new Error("Failed to pull data from server.");
      const data = await res.json();
      setPost(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setApiError(err.message);
      } else {
        setApiError("An unknown error occurred.");
      }
    } finally {
      setApiLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomPost();
  }, []);

  // 5 & 6. URL Parameter Modifiers
  const currentSearch = searchParams.get('search') || '';
  const currentCategory = searchParams.get('category') || '';

  const updateURLParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="space-y-8">
      <header className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-black tracking-tight text-white-900">Experiments & Hook Playground</h1>
        <p className="text-gray-500 text-xs mt-1">Interact with states, tracking updates inside hooks and URL search parameters.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Experiment 1: useState Counter */}
        <section className="bg-white p-6 rounded-xl border border-gray-200">
          <h2 className="font-bold text-sm text-gray-800 uppercase tracking-wider mb-4">1. Counter (useState)</h2>
          <div className="flex items-center gap-6">
            <span className="text-4xl font-extrabold text-gray-900 min-w-16 text-center">{count}</span>
            <div className="flex gap-2">
              <Button onClick={() => setCount((c) => c + 1)}>+</Button>
              <Button variant="secondary" onClick={() => setCount((c) => c - 1)}>-</Button>
              <Button variant="danger" onClick={() => setCount(0)}>Reset</Button>
            </div>
          </div>
        </section>

        {/* Experiment 2: Controlled Input */}
        <section className="bg-white p-6 rounded-xl border border-gray-200">
          <h2 className="font-bold text-sm text-gray-800 uppercase tracking-wider mb-4">2. Controlled Input (useState)</h2>
          <div className="space-y-4 text-gray-900">
            <Input 
              placeholder ="Type your name..." 
              value={name} 
              
              onChange={(e) => setName(e.target.value)} 
            />
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
              <span className="font-bold text-sm text-gray-700">
                Hello, {name.trim() !== '' ? name : <span className="text-gray-400 italic">Stranger</span>}
              </span>
              {name && (
                <Button variant="danger" className="py-1 px-3 text-xs" onClick={() => setName('')}>
                  Clear Input
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Experiment 3: useEffect Timer */}
        <section className="bg-white p-6 rounded-xl border border-gray-200">
          <h2 className="font-bold text-sm text-gray-800 uppercase tracking-wider mb-4">3. Mount Timer (useEffect)</h2>
          <div className="flex items-center gap-4 bg-blue-50 p-4 rounded-xl border border-blue-100">
            <span className="text-2xl">⏳</span>
            <div>
              <p className="text-xs font-bold text-blue-800">Page Stay Duration</p>
              <p className="text-xl font-black text-blue-950 mt-0.5">{seconds} <span className="text-xs font-normal">Seconds elapsed</span></p>
            </div>
          </div>
        </section>

        {/* Experiment 4: Open API Calling */}
        <section className="bg-white p-6 rounded-xl border border-gray-200">
          <h2 className="font-bold text-sm text-gray-800 uppercase tracking-wider mb-4">4. Open API Fetch</h2>
          <div className="min-h-32 flex flex-col justify-between bg-gray-50/50 p-4 rounded-xl border border-gray-100">
            {apiLoading && <p className="text-xs text-gray-500 font-semibold animate-pulse">Loading API entity...</p>}
            
            {apiError && (
              <div className="space-y-2">
                <p className="text-xs text-red-600 font-medium">⚠️ Error: {apiError}</p>
                <Button variant="secondary" className="text-xs py-1 px-3" onClick={fetchRandomPost}>Retry API Fetch</Button>
              </div>
            )}

            {!apiLoading && !apiError && post && (
              <div>
                <h4 className="font-bold text-sm text-gray-800 capitalize line-clamp-1">{post.title}</h4>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{post.body}</p>
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
              <Button onClick={fetchRandomPost} className="text-xs py-1.5 px-3">Pull Random Post</Button>
            </div>
          </div>
        </section>

        {/* Experiments 5 & 6: Single & Multiple Search Parameters */}
        <section className="bg-white p-6 rounded-xl border border-gray-200 md:col-span-2">
          <h2 className="font-bold text-sm text-gray-800 uppercase tracking-wider mb-4">5 & 6. URL Search Parameter Sync</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div>
              <Input className="text-gray-900"
                label="Filter Search (updates: ?search=...)" 
                placeholder="Type query to modify path..." 
                value={currentSearch}
                onChange={(e) => updateURLParam('search', e.target.value)}
              />
            </div>

            <div>
              <SelectFilter className="text-gray-900"
                label="Category Selection (updates: ?category=...)"
                value={currentCategory}
                onChange={(e) => updateURLParam('category', e.target.value)}
                options={[
                  { value: '', label: 'Select Category' },
                  { value: 'technology', label: 'Technology' },
                  { value: 'finance', label: 'Finance' },
                  { value: 'health', label: 'Health' },
                ]}
              />
            </div>

          </div>

          <div className="mt-6 bg-slate-900 text-emerald-400 p-4 rounded-lg font-mono text-xs overflow-x-auto border border-slate-800">
            <span className="text-slate-500">// Real-Time Path State:</span>
            <p className="mt-1 font-bold">{pathname}?{searchParams.toString() || '(no params active)'}</p>
          </div>
        </section>

      </div>
    </div>
  );
}