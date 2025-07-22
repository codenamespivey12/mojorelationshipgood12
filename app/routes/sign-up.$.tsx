import { SignUp } from "@clerk/remix";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#090040] via-[#471396] to-[#B13BFF] flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8">
        <SignUp 
          routing="path" 
          path="/sign-up"
          signInUrl="/sign-in"
          afterSignUpUrl="/assessment/intro"
        />
      </div>
    </div>
  );
}