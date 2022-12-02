import { Colors, HandleChange, TriviaSettings } from "../../types";
import useLocalStorageState from "use-local-storage-state";
import { categories } from "./options";

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

  function handleColorChange(letter: string, e: HandleChange) {
    setColors((prevState) => ({
      ...prevState,
      [letter]: e.target.value,
    }));
  }

  return (
    <div className="mb-12 flex w-full justify-between px-[6.25rem] text-left">
      <div className="relative flex">
        <div className="absolute left-[-3.125rem] h-full -rotate-90 flex-col items-end justify-end ">
          <h2 className="h-[2.25rem] w-[15.625rem] text-center text-babbleGray">
            Quiz settings
          </h2>
          <div className="h-px w-[15.625rem] bg-babbleGray"></div>
        </div>
        <div className="ph-full z-10 flex w-full flex-col items-start gap-[1.563rem] pr-[0.938rem]  text-babbleGray">
          <div>
            <h2 className="pb-[0.938rem]">Category</h2>
            <div>
              <select
                name="category"
                className="h-[3.125 rem] w-[12.5rem] rounded-lg border-[1px] border-babbleGray bg-babbleDarkGray px-[0.938rem] py-0 text-center text-babbleWhite focus:outline-none"
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
            <h2 className="pb-[0.938rem]">Amount of questions</h2>
            <div>
              <input
                className="h-[3.125rem] w-[12.5rem] rounded-lg border-[1px] border-babbleGray bg-babbleDarkGray px-[0.938rem] py-0 text-center text-babbleWhite focus:outline-none"
                type={"number"}
                onChange={(e) => handleChange("questionAmount", e)}
                value={quizSettings.questionAmount}
                min={1}
                max={15}
              ></input>
            </div>
          </div>
          <div>
            <h2 className="pb-[0.938rem]">Difficulty</h2>
            <div>
              <select
                onChange={(e) => handleChange("difficulty", e)}
                value={quizSettings.difficulty}
                name="difficulty"
                className="h-[3.125rem] w-[12.5rem] rounded-lg border-[1px] border-babbleGray bg-babbleDarkGray px-[0.938rem] py-0 text-center text-babbleWhite focus:outline-none"
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
            <h2 className="pb-[0.938rem]">Time to answer (sec)</h2>
            <div>
              <input
                className="h-[3.125rem] w-[12.5rem] rounded-lg border-[1px] border-babbleGray bg-babbleDarkGray px-[0.938rem] py-0 text-center text-babbleWhite text-babbleWhite focus:outline-none"
                type={"number"}
                onChange={(e) => handleChange("timePerQuestion", e)}
                value={quizSettings.timePerQuestion}
                min={1}
              ></input>
            </div>
          </div>
          <div>
            <h2 className="w-[15.625rem] pb-[0.938rem]">
              Time till next question (sec)
            </h2>
            <div>
              <input
                className="h-[3.125rem] w-[12.5rem] rounded-lg border-[1px] border-babbleGray bg-babbleDarkGray px-[0.938rem] py-0 text-center text-babbleWhite focus:outline-none"
                type={"number"}
                onChange={(e) => handleChange("timeInBetween", e)}
                value={quizSettings.timeInBetween}
                min={1}
              ></input>
            </div>
          </div>
          <div>
            <h2 className="pb-[0.938rem]">Elimination</h2>
            <label className="switch mt-[0.25rem]">
              <input
                type="checkbox"
                checked={quizSettings.eliminations}
                onChange={() => handleSwitch("eliminations")}
              ></input>
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>
      <div className="relative ml-[6.25rem] flex">
        <div className="absolute left-[-3.125rem] flex h-full w-full -rotate-90 flex-col items-center px-[3.125rem]">
          <h2 className="h-[2.25rem] w-[15.625rem] text-center text-babbleGray">
            Quiz colors
          </h2>
          <div className="h-px w-[15.625rem] bg-babbleGray"></div>
        </div>
        <div>
          <div className="flex h-full w-full flex-col items-center justify-center text-babbleWhite">
            {/* //map over uesstate colors, and return letters and colors */}
            {Object.keys(colors).map((letter) => (
              <div key={letter} className="flex pb-[0.938rem]">
                {/* //letter */}
                <h2 className="mr-[0.938rem] inline-flex w-6 text-3xl  italic text-babbleWhite">
                  {letter.toUpperCase()}
                </h2>
                {/* //color */}
                <input
                  type="text"
                  className="z-50 mr-[0.938rem] h-[3.125rem] w-[12.5rem] rounded-lg border-[1px] border-babbleGray bg-babbleDarkGray px-[0.938rem] py-0 text-center uppercase focus:outline-none"
                  value={colors[letter]}
                  onChange={(e) => handleColorChange(letter, e)}
                ></input>
                <div className="flex h-[3.125rem] w-[3.125rem] items-center justify-center rounded-lg border-[1px] border-babbleGray bg-babbleDarkGray">
                  <input
                    type={"color"}
                    onChange={(e) => handleColorChange(letter, e)}
                    value={colors[letter]}
                    className="h-[2.25rem] w-[2.25rem] cursor-pointer appearance-none border-babbleGray bg-transparent bg-babbleDarkGray text-center focus:outline-none"
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
