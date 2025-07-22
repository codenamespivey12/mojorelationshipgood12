import { Outlet } from "@remix-run/react";
import { requireAuth } from "~/lib/auth";
import type { LoaderFunctionArgs } from "@remix-run/node";

export async function loader(args: LoaderFunctionArgs) {
  return requireAuth(args);
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