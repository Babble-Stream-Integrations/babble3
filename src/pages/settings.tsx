import { useNavigate } from "react-router-dom";
import QuizSettings from "../components/quizComponent/quizSettings";
import { motion } from "framer-motion";
import { DefaultButton } from "../components/defaultButton/defaultButton";
import toast from "react-hot-toast";

export default function Settings() {
  const navigate = useNavigate();

  return (
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
      className="flex flex-col items-center justify-center"
    >
      <QuizSettings />
      <DefaultButton
        text="Save"
        buttonClick={() => {
          toast.success("Settings saved!");
          navigate("/");
        }}
      />
    </motion.div>
  );
}
