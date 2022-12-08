import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLightbulb, FaBug, FaComment, FaSpinner } from "react-icons/fa";
import { useState } from "react";
import { DefaultButton } from "../components/defaultButton/defaultButton";

import axios from "axios";
import useSessionStorageState from "use-session-storage-state";

export default function Feedback() {
  const navigate = useNavigate();

  // State
  const [type, setType] = useState("ideas");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [posting, setPosting] = useState(false);

  // Retrieve account from session storage
  const [account] = useSessionStorageState("account", {
    defaultValue: {
      username: "",
      platform: "",
      babbleToken: "",
      uid: "",
    },
  });

  /**
   * Handle the submission of the feedback form
   * @returns void
   */
  function handleSubmit() {
    if (subject === "" || body === "") {
      return;
    }

    // Set 'posting' to true to disable the submit button
    setPosting(true);

    // Send the feedback to Functions
    axios
      .post(
        `https://europe-west1-babble-d6ef3.cloudfunctions.net/default/feedback`,
        {
          type: type,
          token: account.babbleToken,
          subject: subject,
          feedback: body,
        }
      )
      .finally(() => {
        alert("Thank you for your valued opinion!");
        navigate(-1);
      });
  }

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
      <div className="grid grid-cols-5 gap-5">
        <div>
          <div className="w-[130px] pb-2 text-center">
            <h2 className="uppercase text-white">Reason</h2>
          </div>
          <button
            className={`${
              type === "ideas"
                ? "border-babbleOrange bg-gradient-to-br from-babbleOrange/20 to-babbleOrange/0 text-white"
                : ""
            } group relative flex h-[130px] w-[130px] flex-col items-center justify-center overflow-hidden whitespace-nowrap rounded-babble border border-babbleGray bg-babbleLightGray/5 p-4 text-babbleGray shadow-babbleOuter backdrop-blur-babble transition duration-300 hover:overflow-hidden hover:border-babbleOrange hover:text-babbleWhite`}
            onClick={() => {
              setType("ideas");
            }}
          >
            <FaLightbulb className="z-10" size={30} />
            <p className="weight pt-3 font-thin">Idea</p>

            <div
              className={`absolute inset-0 z-0 h-full w-full overflow-hidden bg-gradient-to-br from-babbleOrange/20 to-babbleOrange/0 opacity-0 transition duration-300 hover:opacity-100 group-hover:opacity-100`}
            />
          </button>

          <button
            className={`${
              type === "bugs"
                ? "border-babbleOrange bg-gradient-to-br from-babbleOrange/20 to-babbleOrange/0 text-white"
                : ""
            } group relative mt-5 flex h-[130px] w-[130px] flex-col items-center justify-center overflow-hidden whitespace-nowrap rounded-babble border border-babbleGray bg-babbleLightGray/5 p-4 text-babbleGray shadow-babbleOuter backdrop-blur-babble transition duration-300 hover:overflow-hidden hover:border-babbleOrange hover:text-babbleWhite`}
            onClick={() => {
              setType("bugs");
            }}
          >
            <FaBug className="z-10" size={30} />
            <p className="weight pt-3 font-thin">Bug</p>

            <div
              className={`absolute inset-0 z-0 h-full w-full overflow-hidden bg-gradient-to-br from-babbleOrange/20 to-babbleOrange/0 opacity-0 transition duration-300 hover:opacity-100 group-hover:opacity-100`}
            />
          </button>

          <button
            className={`${
              type === "comments"
                ? "border-babbleOrange bg-gradient-to-br from-babbleOrange/20 to-babbleOrange/0 text-white"
                : ""
            } group relative mt-5 flex h-[130px] w-[130px] flex-col items-center justify-center overflow-hidden whitespace-nowrap rounded-babble border border-babbleGray bg-babbleLightGray/5 p-4 text-babbleGray shadow-babbleOuter backdrop-blur-babble transition duration-300 hover:overflow-hidden hover:border-babbleOrange hover:text-babbleWhite`}
            onClick={() => {
              setType("comments");
            }}
          >
            <FaComment className="z-10" size={30} />
            <p className="weight pt-3 font-thin">Comment</p>

            <div
              className={`absolute inset-0 z-0 h-full w-full overflow-hidden bg-gradient-to-br from-babbleOrange/20 to-babbleOrange/0 opacity-0 transition duration-300 hover:opacity-100 group-hover:opacity-100`}
            />
          </button>
        </div>

        <div className="col-span-4 text-white">
          <div>
            <h2 className="ml-[16px] pb-2 uppercase">Subject</h2>
            <div>
              <input
                className=" w-full rounded-3xl border-[1px] border-babbleGray bg-babbleDarkGray px-[15px] py-[7px] focus:outline-none"
                type={"text"}
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
              />
            </div>
          </div>

          <div>
            <h2 className="ml-[16px] mt-4 pb-2 uppercase">Information</h2>
            <div>
              <textarea
                cols={30}
                rows={13}
                onChange={(e) => {
                  setBody(e.target.value);
                }}
                className="h-auto w-full rounded-3xl border-[1px] border-babbleGray bg-babbleDarkGray px-[15px] py-[14px] focus:outline-none"
              ></textarea>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-end">
            <DefaultButton
              simplified
              text="Cancel"
              buttonClick={() => navigate(-1)}
            />

            <button
              className={`${
                posting ? "opacity-70" : ""
              } m-5 mr-0 rounded-3xl bg-white px-10 py-2 font-bold uppercase text-babbleDarkGray`}
              disabled={posting}
              onClick={() => {
                handleSubmit();
              }}
            >
              {posting === true && (
                <FaSpinner className="animate-spin" size={20} />
              )}

              {posting === false && <span>Submit</span>}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
