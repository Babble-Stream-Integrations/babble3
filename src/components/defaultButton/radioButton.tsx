type RadioButtonProps = {
  name: string;
  icon: JSX.Element;
  value: string;
  setValue: (value: string) => void;
  color: string;
  startColor: string;
  endColor: string;
};

export default function RadioButton({
  name,
  icon,
  value,
  setValue,
}: RadioButtonProps) {
  return (
    <label key={value}>
      <input
        type="radio"
        name="option"
        className="peer hidden"
        onChange={() => setValue(value)}
      />
      <div className="group relative mb-5 flex h-[130px] w-[130px] flex-col items-center justify-center overflow-hidden whitespace-nowrap rounded-babble border border-babbleGray bg-babbleLightGray/5 p-4 text-babbleGray shadow-babbleOuter backdrop-blur-babble transition duration-300 hover:border-babbleOrange hover:bg-gradient-to-br hover:text-white peer-checked:border-2 peer-checked:border-babbleOrange peer-checked:bg-gradient-to-br peer-checked:from-babbleOrange/30 peer-checked:to-babbleOrange/10 peer-checked:text-babbleLightGray">
        {icon}
        <p className="weight pt-3 font-thin">{name}</p>
        <div className="absolute inset-0 z-0 h-full w-full overflow-hidden bg-gradient-to-br from-babbleOrange/20 to-babbleOrange/0 opacity-0 transition duration-300 hover:opacity-100 group-hover:opacity-100" />
      </div>
    </label>
  );
}
