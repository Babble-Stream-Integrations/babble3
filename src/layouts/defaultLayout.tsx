import { motion } from "framer-motion";

type LayoutProps = {
  title: string;
  subtitle?: string;
  children: JSX.Element;
};

export const DefaultLayout = ({ title, subtitle, children }: LayoutProps) => {
  return (
    <div className=" overflow-hidden">
      <motion.div
        initial={{
          opacity: 0,
        }}
        transition={{
          duration: 1,
        }}
        whileInView={{
          opacity: 1,
        }}
        viewport={{
          once: true,
        }}
        className="flex min-h-screen w-screen flex-col items-center justify-center bg-gradient-radial from-[#202024] to-[#0E0E10]"
      >
        <h1 className="text-center text-4xl font-normal text-babbleWhite">
          {title}
        </h1>

        {subtitle && (
          <p className="z-10 mt-[25px] w-[28%] min-w-[300px] text-center text-base font-thin text-babbleGray">
            {subtitle}
          </p>
        )}
        <main className="pt-14">{children}</main>
      </motion.div>
    </div>
  );
};
