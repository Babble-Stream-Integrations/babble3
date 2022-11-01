import React from "react";
import logoBig from "../../assets/logo-full.png";

export default function footerComponent() {
  return (
    <div className="absolute bottom-[75px] flex w-screen flex-col items-center">
      <img src={logoBig} className="w-[121px] pb-4"></img>
      <h1 className=" font-thin text-babbleGray">
        © 2022 Babble Stream Integrations
      </h1>
    </div>
  );
}
