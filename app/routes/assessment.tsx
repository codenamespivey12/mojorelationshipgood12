import { Outlet } from "@remix-run/react";
import { getOptionalAuth } from "~/lib/auth";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

export async function loader(args: LoaderFunctionArgs) {
  // Allow both authenticated and guest users for assessment
  const userId = await getOptionalAuth(args);
  return json({ userId });
}

export default function AssessmentLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#090040] via-[#471396] to-[#B13BFF]">
      <div className="container mx-auto px-4 py-8">
        <Outlet />
      </div>
    </div>
  );
}