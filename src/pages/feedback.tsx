import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLightbulb, FaBug, FaComment, FaSpinner } from "react-icons/fa";
import { useState } from "react";
import { DefaultButton } from "../components/defaultButton/defaultButton";

import axios from "axios";
import useSessionStorageState from "use-session-storage-state";
import clsx from "clsx";
import RadioButton from "../components/defaultButton/radioButton";
import { toast } from "react-hot-toast";

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
      uid: "",
    },
  });

  const reasons = [
    {
      name: "Ideas",
      icon: <FaLightbulb size={30} />,
      value: "ideas",
    },
    {
      name: "Bugs",
      icon: <FaBug size={30} />,
      value: "bugs",
    },
    {
      name: "Comments",
      icon: <FaComment size={30} />,
      value: "comments",
    },
  ];

  /**
   * Handle the submission of the feedback form
   * @returns void
   */

  function onSuccess() {
    return (
      <>
        {navigate("/")}
        <span>Feedback submitted!</span>
      </>
    );
  }

  // If the feedback submission fails, display an error message with option to mail
  function onError() {
    return (
      <>
        <span>
          error submitting feedback please email it to us{" "}
          <a
            className="text-blue-500 underline"
            target="_blank"
            href={`mailto:jarno.akkerman@student.hu.nl?subject=from ${account.username}, ${subject}&body=${body}`}
            rel="noreferrer"
          >
            here
          </a>
        </span>
      </>
    );
  }

  function handleSubmit() {
    if (subject === "" || body === "") {
      return;
    }

    // Set 'posting' to true to disable the submit button
    setPosting(true);

    // Send the feedback to the backend and display a toast
    toast.promise(
      new Promise((resolve, reject) => {
        axios
          .post(
            `https://europe-west1-babble-d6ef3.cloudfunctions.net/default/feedback`,
            {
              type: type,
              username: account.username,
              subject: subject,
              feedback: body,
            }
          )
          .then((res) => {
            if (res.status === 201) {
              resolve(200);
              setPosting(false);
            } else {
              reject(400);
              setPosting(false);
            }
          })
          .catch(() => {
            reject(400);
            setPosting(false);
          });
      }),
      {
        loading: "Submitting feedback...",
        success: onSuccess(),
        error: onError(),
      }
    );
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
          {reasons.map((reason) => (
            <RadioButton
              key={reason.value}
              name={reason.name}
              icon={reason.icon}
              value={reason.value}
              setValue={setType}
              color="babbleOrange"
              startColor=""
              endColor=""
            />
          ))}
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
              className={clsx(
                posting ? "opacity-70" : "",
                "m-5 mr-0 rounded-3xl bg-white px-10 py-2 font-bold uppercase text-babbleDarkGray"
              )}
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
