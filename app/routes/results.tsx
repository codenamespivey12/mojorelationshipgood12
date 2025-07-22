import { Outlet } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Results - Relationship Mojo" },
    { name: "description", content: "View your personalized relationship analysis and insights." },
  ];
};

export default function ResultsLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Outlet />
      </div>
    </div>
  );
}