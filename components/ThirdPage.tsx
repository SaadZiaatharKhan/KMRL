import React from "react";
import Image from "next.js";

const ThirdPage = () => {
  return (
<div className="flex justify-center items-center w-screen h-screen">
  <div className="relative w-[800px] h-[600px]">
    <Image src="/images/Gemini.webp" alt="Gemini" fill className="object-contain" />
  </div>
</div>
  );
};

export default ThirdPage;