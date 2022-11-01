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
        timePerQuestion: 12,
        timeInBetween: 8,
        eliminations: false,
        category: categories[0],
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
    <div className="flex w-full justify-between px-[100px] text-left">
      <div className="flex h-full w-full flex-col items-start gap-[25px] font-bold text-white">
        <div>
          <div>
            <h2 className="pb-[15px]">Amount of questions</h2>
            <div>
              <input
                className="h-[36px] w-[150px] rounded-full border-[3px] border-white bg-babbleDarkGray px-[15px] py-0 text-center focus:outline-none"
                type={"number"}
                onChange={(e) => handleChange("questionAmount", e)}
                value={quizSettings.questionAmount}
                min={1}
                max={50}
              ></input>
            </div>
          </div>
        </div>
        <div>
          <h2 className="pb-[15px]">Difficulty</h2>
          <div>
            <select
              name="difficulty"
              className="h-[36px] w-[150px] rounded-full border-[3px] border-white bg-babbleDarkGray px-[15px] py-0 text-center focus:outline-none"
              id=""
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>
        <div>
          <h2 className="pb-[15px]">Category</h2>
          <div>
            <select
              name="category"
              className="h-[36px] w-[150px] rounded-full border-[3px] border-white bg-babbleDarkGray px-[15px] py-0 text-center focus:outline-none"
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
          <h2 className="pb-[15px]">Time to answer (sec)</h2>
          <div>
            <input
              className="h-[36px] w-[150px] rounded-full border-[3px] border-white bg-babbleDarkGray px-[15px] py-0 text-center focus:outline-none"
              type={"number"}
              onChange={(e) => handleChange("timePerQuestion", e)}
              value={quizSettings.timePerQuestion}
              min={1}
            ></input>
          </div>
        </div>
        <div>
          <h2 className="pb-[15px]">Time till next question (sec)</h2>
          <div>
            <input
              className="h-[36px] w-[150px] rounded-full border-[3px] border-white bg-babbleDarkGray px-[15px] py-0 text-center focus:outline-none"
              type={"number"}
              onChange={(e) => handleChange("timeInBetween", e)}
              value={quizSettings.timeInBetween}
              min={1}
            ></input>
          </div>
        </div>
        <div>
          <h2 className="pb-[15px]">Elminination</h2>
          <label className="switch">
            <input
              type="checkbox"
              checked={quizSettings.eliminations}
              onChange={() => handleSwitch("eliminations")}
            ></input>
            <span className="slider"></span>
          </label>
        </div>
      </div>
      <div className="flex h-full w-full flex-col items-start font-bold text-white">
        <h2 className="pb-[15px]">Quiz colors</h2>
        {/* //map over uesstate colors, and return letters and colors */}
        {Object.keys(colors).map((letter) => (
          <div key={letter} className="flex pb-[15px]">
            {/* //letter */}
            <h2 className="mr-[15px] inline-flex w-6 text-3xl font-bold italic">
              {letter.toUpperCase()}
            </h2>
            {/* //color */}
            <input
              type="text"
              className="mr-[15px] h-[36px] w-[150px] rounded-full border-[3px] border-white bg-babbleDarkGray px-[15px] py-0 text-center focus:outline-none"
              value={colors[letter]}
              onChange={(e) => handleColorChange(letter, e)}
            ></input>
            <input
              type={"color"}
              onChange={(e) => handleColorChange(letter, e)}
              value={colors[letter]}
              className="h-[36px] w-[36px] cursor-pointer appearance-none border-none bg-transparent bg-babbleDarkGray text-center focus:outline-none"
            ></input>
          </div>
        ))}
      </div>
    </div>
  );
}
