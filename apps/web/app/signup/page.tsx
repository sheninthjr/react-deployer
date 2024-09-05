import { SignupForm } from '@/components/SignupForm';

export default function Signup() {
  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div className="flex justify-center ">
          <SignupForm type="Signup" />
        </div>
      </div>
    </>
  );
}
