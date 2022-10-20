import { Colors, TriviaSettings } from "../../types";
import useLocalStorageState from "use-local-storage-state";

export default function QuizSettings() {
  const [quizSettings, setQuizSettings] = useLocalStorageState<TriviaSettings>(
    "quizSettings",
    {
      defaultValue: {
        channel: "esl_csgo",
        startAfter: 10,
        questionAmount: 10,
        timePerQuestion: 12,
        timeInBetween: 8,
        elimination: false,
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

  function handleChange(p: string, e: React.ChangeEvent<HTMLInputElement>) {
    setQuizSettings((prevState) => ({
      ...prevState,
      [p]: e.target.value,
    }));
  }

  function handleSwitch(p: string) {
    const elimination = !quizSettings.elimination;
    setQuizSettings((prevState) => ({
      ...prevState,
      [p]: elimination,
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
            >
              <option>General Knowledge</option>
              <option value="Entertainment: Books">Entertainment: Books</option>
              <option value="Entertainment: Film">Entertainment: Film</option>
              <option value="Entertainment: Music">Entertainment: Music</option>
              <option value="Entertainment: Musicals &amp; Theatres">
                Entertainment: Musicals &amp; Theatres
              </option>
              <option value="Entertainment: Television">
                Entertainment: Television
              </option>
              <option value="Entertainment: Video Games">
                Entertainment: Video Games
              </option>
              <option value="Entertainment: Board Games">
                Entertainment: Board Games
              </option>
              <option value="Science &amp; Nature">Science &amp; Nature</option>
              <option value="Science: Computers">Science: Computers</option>
              <option value="Science: Mathematics">Science: Mathematics</option>
              <option value="Mythology">Mythology</option>
              <option value="Sports">Sports</option>
              <option value="Geography">Geography</option>
              <option value="History">History</option>
              <option value="Politics">Politics</option>
              <option value="Art">Art</option>
              <option value="Celebrities">Celebrities</option>
              <option value="Animals">Animals</option>
              <option value="Vehicles">Vehicles</option>
              <option value="Entertainment: Comics">
                Entertainment: Comics
              </option>
              <option value="Science: Gadgets">Science: Gadgets</option>
              <option value="Entertainment: Japanese Anime &amp; Manga">
                Entertainment: Japanese Anime &amp; Manga
              </option>
              <option value="Entertainment: Cartoon &amp; Animations">
                Entertainment: Cartoon &amp; Animations
              </option>
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
              checked={quizSettings.elimination}
              onChange={() => handleSwitch("elimination")}
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
