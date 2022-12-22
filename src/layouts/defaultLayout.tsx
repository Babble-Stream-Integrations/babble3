import { motion } from "framer-motion";

type LayoutProps = {
  title: string;
  subtitle?: string;
  children: JSX.Element;
};

export const DefaultLayout = ({ title, subtitle, children }: LayoutProps) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      whileInView={{
        opacity: 1,
      }}
      viewport={{
        once: true,
      }}
      className="flex min-h-screen w-screen flex-col items-center justify-center bg-gradient-radial from-[#202024] to-[#0E0E10]"
    >
      <h1 className="mb-5 text-center text-5xl font-normal text-babbleWhite">
        {title}
      </h1>

      {subtitle && (
        <p className="z-10 mb-12 min-w-[300px] max-w-[30%] text-center text-base font-thin text-babbleGray">
          {subtitle}
        </p>
      )}
      <main>{children}</main>
    </motion.div>
  );
};
