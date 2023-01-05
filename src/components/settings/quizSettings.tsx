import useLocalStorageState from "use-local-storage-state";
import clsx from "clsx";
import { categories } from "play/quiz/quizComponent/options";
import type { Colors, HandleChange, TriviaSettings } from "../../types";

export default function QuizSettings() {
  const [quizSettings, setQuizSettings] = useLocalStorageState<TriviaSettings>(
    "quizSettings",
    {
      defaultValue: {
        channel: "",
        startAfter: 10,
        questionAmount: 10,
        timePerQuestion: 30,
        timeInBetween: 8,
        eliminations: false,
        category: categories[0],
        difficulty: "medium",
      },
    }
  );

  const [colors, setColors] = useLocalStorageState<Colors>("colors", {
    defaultValue: {
      a: "#E42256",
      b: "#FDC74C",
      c: "#00B1B0",
      d: "#FF8370",
    },
  });

  function handleChange(p: string, e: HandleChange) {
    setQuizSettings((prevState) => ({
      ...prevState,
      [p]: e.target.value,
    }));
  }

  function handleSwitch(p: string) {
    const eliminations = !quizSettings.eliminations;
    setQuizSettings((prevState) => ({
      ...prevState,
      [p]: eliminations,
    }));
  }

  const handleNumberChange = (p: string, e: HandleChange) => {
    const inputValue = e.target.value;
    const numValue = Number(inputValue);
    if (e.target instanceof HTMLInputElement) {
      const max = Number(e.target.max);
      if (numValue % 1 === 0) {
        if (numValue <= Number(e.target.max)) {
          //check if number is smaller than max and if it is a whole number
          setQuizSettings((prevState) => ({
            ...prevState,
            [p]: numValue,
          }));
        } else {
          setQuizSettings((prevState) => ({
            ...prevState,
            [p]: max,
          }));
        }
      }
    }
  };

  function handleColorChange(letter: string, e: HandleChange) {
    setColors((prevState) => ({
      ...prevState,
      [letter]: e.target.value,
    }));
  }

  return (
    <div className="mb-12 flex w-full justify-between overflow-hidden px-[6.25rem] text-left">
      <div className="relative flex">
        <div className="absolute left-[-3.125rem] h-full -rotate-90 flex-col items-end justify-end ">
          <h2 className="h-[2.25rem] w-[395px] text-center text-babbleGray">
            Quiz settings
          </h2>
          <div className="mb-5 h-px w-[395px] bg-babbleGray"></div>
        </div>
        <div className="ph-full z-10 flex w-full flex-col items-start gap-[1.563rem] pr-[0.938rem]  text-babbleGray">
          <div>
            <h2 className="pb-[10px]">Category</h2>
            <div>
              <select
                name="category"
                className="h-[80px] w-[300px] rounded-babble border border-[#A8A8A8] bg-babbleDarkGray px-[0.938rem] text-center text-white shadow-babbleOuter"
                id=""
                value={quizSettings.category}
                onChange={(e) => handleChange("category", e)}
              >
                {categories.map((category) => (
                  <option
                    value={category}
                    key={category}
                    dangerouslySetInnerHTML={{ __html: category }}
                  />
                ))}
              </select>
            </div>
          </div>
          <div>
            <h2 className="pb-[10px]">Amount of questions</h2>
            <div>
              <input
                className="h-[80px] w-[300px] rounded-babble border border-[#A8A8A8] bg-babbleDarkGray px-[0.938rem] text-center text-white shadow-babbleOuter"
                type={"number"}
                onChange={(e) => handleNumberChange("questionAmount", e)}
                value={quizSettings.questionAmount}
                min={1}
                max={15}
              ></input>
            </div>
          </div>
          <div>
            <h2 className="pb-[10px]">Difficulty</h2>
            <div>
              <select
                onChange={(e) => handleChange("difficulty", e)}
                value={quizSettings.difficulty}
                name="difficulty"
                className="h-[80px] w-[300px] rounded-babble border border-[#A8A8A8] bg-babbleDarkGray px-[0.938rem] text-center text-white shadow-babbleOuter"
                id=""
              >
                {/* <option value="easy">Easy</option> */}
                <option value="medium">Medium</option>
                {/* <option value="hard">Hard</option> */}
              </select>
            </div>
          </div>
        </div>
        <div className="flex h-full w-full flex-col items-start gap-[1.563rem]  text-babbleGray">
          <div>
            <h2 className="pb-[10px]">Time to answer (sec)</h2>
            <div>
              <input
                className="h-[80px] w-[300px] rounded-babble border border-[#A8A8A8] bg-babbleDarkGray px-[0.938rem] text-center text-white shadow-babbleOuter"
                type={"number"}
                onChange={(e) => handleNumberChange("timePerQuestion", e)}
                value={quizSettings.timePerQuestion}
                min={1}
                max={60}
              ></input>
            </div>
          </div>
          <div>
            <h2 className="w-[15.625rem] pb-[10px]">
              Time till next question (sec)
            </h2>
            <div>
              <input
                className="h-[80px] w-[300px] rounded-babble border border-[#A8A8A8] bg-babbleDarkGray px-[0.938rem] text-center text-white shadow-babbleOuter"
                type={"number"}
                onChange={(e) => handleNumberChange("timeInBetween", e)}
                value={quizSettings.timeInBetween}
                min={1}
                max={20}
              ></input>
            </div>
          </div>
          <div>
            <h2 className="pb-[10px]">Elimination</h2>
            <label
              htmlFor="check"
              className={clsx(
                "relative mt-[0.25rem] flex h-9 w-16 cursor-pointer rounded-full border-[2px] border-babbleGray",
                quizSettings.eliminations &&
                  "border-babbleWhite shadow-[0px_0px_8px] shadow-babbleWhite"
              )}
            >
              <input
                type="checkbox"
                id="check"
                className="peer sr-only"
                checked={quizSettings.eliminations}
                onChange={() => handleSwitch("eliminations")}
              />
              <span className="absolute left-1 top-1 h-6 w-6 rounded-full bg-babbleGray transition-all duration-200 peer-checked:left-[32px] peer-checked:bg-babbleWhite"></span>
            </label>
          </div>
        </div>
      </div>
      <div className="relative ml-[6.25rem] flex">
        <div className="absolute left-[-3.125rem] h-full -rotate-90 flex-col items-end justify-end">
          <h2 className="h-[2.25rem] w-[395px] text-center text-babbleGray">
            Quiz colors
          </h2>
          <div className="h-px w-[395px] bg-babbleGray"></div>
        </div>
        <div>
          <div className="flex h-full w-full flex-col items-center justify-center text-babbleWhite">
            {/* //map over usestate colors, and return letters and colors */}
            {Object.keys(colors).map((letter) => (
              <div key={letter} className="flex pb-[0.938rem]">
                {/* //letter */}
                <h2 className="mr-[0.938rem] inline-flex w-6 items-center justify-center text-3xl italic">
                  {letter.toUpperCase()}
                </h2>
                {/* //color */}
                <input
                  type="text"
                  className="z-50 mr-[0.938rem] h-[5rem] w-[12.5rem] rounded-babble border-[1px] border-babbleGray bg-babbleDarkGray px-[0.938rem] py-0 text-center uppercase shadow-babbleOuter focus:outline-none"
                  value={colors[letter]}
                  onChange={(e) => handleColorChange(letter, e)}
                ></input>
                <div className="flex h-[5rem] w-[5rem] items-center justify-center rounded-babble border-[1px] border-babbleGray bg-babbleDarkGray shadow-babbleOuter">
                  <input
                    type={"color"}
                    onChange={(e) => handleColorChange(letter, e)}
                    value={colors[letter]}
                    className="z-50 h-[50px] w-[50px] cursor-pointer appearance-none border-none bg-transparent bg-babbleDarkGray text-center focus:outline-none"
                  ></input>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
