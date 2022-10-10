import logoBig from "../assets/logo-full.png";
import { Colors, TriviaSettings } from "../types";
import useLocalStorageState from "use-local-storage-state";

export default function Settings() {
  const [quizSettings, setQuizSettings] = useLocalStorageState<TriviaSettings>(
    "quizSettings",
    {
      defaultValue: {
        channel: "test",
        startAfter: 10,
        questionAmount: 10,
        timePerQuestion: 20,
        timeInBetween: 8,
      },
    }
  );

  const [colors, setColors, { removeItem }] = useLocalStorageState<Colors>(
    "colors",
    {
      defaultValue: {
        a: "#ad1fff",
        b: "#ea9148",
        c: "#95b418",
        d: "#5d576b",
      },
    }
  );

  function handleChange(p: string, e: React.ChangeEvent<HTMLInputElement>) {
    setQuizSettings((prevState) => ({
      ...prevState,
      [p]: e.target.value,
    }));
  }

  function handleColorChange(
    letter: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setColors((prevState) => ({
      ...prevState,
      [letter]: e.target.value,
    }));
  }

  return (
    <div className=" flex min-h-screen items-center justify-center overflow-hidden bg-babbleBlack">
      <div className="relative z-10 flex min-h-[664px] min-w-[883px] flex-col items-center gap-4 rounded-babble bg-babbleGray py-[50px] text-center drop-shadow-xl">
        <h1 className="pb-[25px] text-4xl font-bold text-babbleWhite">
          Settings
        </h1>
        <div className="flex w-full justify-between px-[100px] text-left">
          <div className="flex h-full w-full flex-col items-start gap-[25px] font-bold text-white">
            <div>
              <div className="">
                <h2 className="pb-[15px]">Amount of questions</h2>
                <div>
                  <input
                    className="h-[36px] w-[150px] rounded-full border-[3px] border-white bg-babbleGray py-1 text-center"
                    type={"number"}
                    onChange={(e) => handleChange("questionAmount", e)}
                    value={quizSettings.questionAmount}
                    min={1}
                    max={50}
                  ></input>
                </div>
              </div>
            </div>
            <div className="">
              <h2 className="pb-[15px]">Difficulty</h2>
              <div>
                <select
                  name="difficulty"
                  className="h-[36px] w-[150px] rounded-full border-[3px] border-white bg-babbleGray py-1 text-center"
                  id=""
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>
            <div className="">
              <h2 className="pb-[15px]">Time to answer sec</h2>
              <div>
                <input
                  className="h-[36px] w-[150px] rounded-full border-[3px] border-white bg-babbleGray py-1 text-center"
                  type={"number"}
                  onChange={(e) => handleChange("timePerQuestion", e)}
                  value={quizSettings.timePerQuestion}
                  min={1}
                ></input>
              </div>
            </div>
            <div className="">
              <h2 className="pb-[15px]">Time till next question sec</h2>
              <div>
                <input
                  className="h-[36px] w-[150px] rounded-full border-[3px] border-white bg-babbleGray py-1 text-center"
                  type={"number"}
                  onChange={(e) => handleChange("timeInBetween", e)}
                  value={quizSettings.timeInBetween}
                  min={1}
                ></input>
              </div>
            </div>
          </div>
          <div className="flex h-full w-full flex-col items-start font-bold text-white">
            <h2 className="pb-[15px]">Quiz colors</h2>
            {/* //map over uesstate colors, and return letters and colors */}
            {Object.keys(colors).map((letter) => (
              <div key={letter} className="flex pb-[15px]">
                {/* //letter */}
                <h2 className="mr-[15px] inline-flex text-3xl font-bold italic">
                  {letter.toUpperCase()}
                </h2>
                {/* //color */}
                <input
                  type="text"
                  className="mr-[15px] h-[36px] w-[150px] rounded-full border-[3px] border-white bg-babbleGray py-2 text-center"
                  value={colors[letter]}
                  onChange={(e) => handleColorChange(letter, e)}
                ></input>
                <input
                  type={"color"}
                  onChange={(e) => handleColorChange(letter, e)}
                  value={colors[letter]}
                  className="h-[36px] w-[36px] cursor-pointer appearance-none border-none bg-transparent bg-babbleGray text-center"
                ></input>
              </div>
            ))}
          </div>
        </div>
        <button className="text-l flex items-center justify-center gap-2 rounded-full bg-gradient-to-tr from-babbleYellow to-babbleRed px-12 py-2 font-bold uppercase text-babbleGray hover:from-babbleOrange hover:to-babbleRed">
          Save
        </button>
        <button
          className="text-l flex items-center justify-center gap-2 rounded-full bg-gradient-to-tr from-babbleYellow to-babbleRed px-12 py-2 font-bold uppercase text-babbleGray hover:from-babbleOrange hover:to-babbleRed"
          onClick={() => removeItem()}
        >
          Reset
        </button>
      </div>
      <h1 className="absolute bottom-[100px] text-babbleWhite">
        © 2022 Babble stream integrations
      </h1>
      <div className="absolute left-0 top-0 h-[30rem] w-[30rem] items-start justify-start rounded-br-full bg-gradient-to-t from-babbleYellow to-babbleRed ">
        <div className=" h-[29.2rem] w-[29.2rem] rounded-br-full bg-babbleBlack"></div>
      </div>
      <div className="absolute right-0 bottom-0 flex h-[30rem] w-[30rem] items-end justify-end rounded-tl-full bg-gradient-to-t from-babbleLightblue to-babbleDarkblue ">
        <div className=" h-[29.2rem] w-[29.2rem] rounded-tl-full bg-babbleBlack"></div>
      </div>
      <div className="absolute right-20 top-16">
        <img src={logoBig} className="h-10"></img>
      </div>
      <div className="absolute bottom-0 "></div>
    </div>
  );
}
