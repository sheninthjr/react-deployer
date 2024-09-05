import { getUserDetails } from '@/hooks/userDetails';
import { useRouter } from 'next/navigation';

export const Navbar = () => {
  const router = useRouter();
  const userId = getUserDetails().userId;

  const onClickSignup = () => {
    router.push('/signup');
  };
  return (
    <div className="flex gap-4 justify-end">
      {!userId && (
        <div className="border border-b-white bg-white text-black rounded-lg pl-4 pr-4 pt-2 pb-2">
          <button onClick={onClickSignup}>Login</button>
        </div>
      )}
      <div className="flex justify-end">
        {userId && (
          <button className="border border-b-white bg-white text-black rounded-lg pl-4 pr-4 pt-2 pb-2">
            Deploy
          </button>
        )}
      </div>
    </div>
  );
};
