import { getAuth } from '@clerk/remix/ssr.server';
import type { LoaderFunctionArgs, ActionFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';

export async function requireAuth(args: LoaderFunctionArgs | ActionFunctionArgs) {
  const { userId } = await getAuth(args);
  
  if (!userId) {
    throw redirect('/sign-in');
  }
  
  return userId;
}

export async function getOptionalAuth(args: LoaderFunctionArgs | ActionFunctionArgs) {
  const { userId } = await getAuth(args);
  return userId;
}

export function isGuestMode(userId: string | null): boolean {
  return !userId;
}