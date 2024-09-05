import { AnimatedPin } from './3DCard';
import { Navbar } from './Navbar';

export const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 border border-neutral-700 dark:border-neutral-700 bg-black dark:bg-neutral-900 flex flex-col gap-2 flex-2 w-full h-full">
        <Navbar />
        <div className="text-4xl font-extrabold font-sans">Your Deployment</div>
        <div className="flex">
          <div className="flex justify-start align-top">
            <AnimatedPin />
          </div>
        </div>
      </div>
    </div>
  );
};
