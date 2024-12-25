// src/app/page.tsx
'use client';

import ResourceDashboard from '@/components/ui/ResourceDashboard';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-zinc-800">
          Resource Management System
        </h1>
        <ResourceDashboard />
      </div>
    </main>
  );
}