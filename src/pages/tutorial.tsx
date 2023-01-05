import { useNavigate } from "react-router-dom";
import { DefaultButton } from "default/defaultButton";

export default function Tutorial() {
  const navigate = useNavigate();
  return (
    <DefaultButton
      text="Back"
      buttonClick={() => {
        navigate("/");
      }}
    />
  );
}
