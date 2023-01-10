import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import QuizSettings from "settings/quizSettings";
import { DefaultButton } from "default/defaultButton";
import Joyride from "components/tutorial/tutorial";
import { settingsSteps } from "components/tutorial/steps";

export default function Settings() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center">
      <Joyride steps={settingsSteps} />
      <QuizSettings />
      <DefaultButton
        text="Save"
        buttonClick={() => {
          toast.success("Settings saved!");
          navigate(-1);
        }}
      />
    </div>
  );
}
