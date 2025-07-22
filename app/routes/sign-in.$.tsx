import { SignIn } from "@clerk/remix";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#090040] via-[#471396] to-[#B13BFF] flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8">
        <SignIn 
          routing="path" 
          path="/sign-in"
          signUpUrl="/sign-up"
          afterSignInUrl="/assessment"
        />
      </div>
    </div>
  );
}