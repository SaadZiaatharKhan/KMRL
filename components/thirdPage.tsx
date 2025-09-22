import React from "react";
import Image from "next/image";

const ThirdPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-white">
      {/* Page title */}
      <header className="w-full py-8">
        <h1 className="text-2xl font-bold text-center text-gray-900">
          Document Intelligence Solutions
        </h1>
      </header>

      {/* Main layout */}
      <main
        className="flex-1 w-full grid"
        style={{ gridTemplateColumns: "1fr 800px 1fr", alignItems: "center" }}
      >
        {/* LEFT COLUMN */}
        <div className="flex flex-col items-start justify-between h-[600px] pl-16">
          {/* Top-left */}
          <div
            className="w-[300px] h-[200px] rounded-3xl shadow-xl p-6 flex flex-col justify-evenly 
                       transform transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl ml-8"
            style={{
              background: "linear-gradient(135deg,#E6FFFA 0%, #BDECF0 100%)",
            }}
          >
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
                <Image
                  src={"/images/thirdpage_icons/loop-square.svg"}
                  width={24}
                  height={24}
                  alt="automate-icon"
                />
              </div>
            </div>
            <p className="text-xl font-semibold text-center text-gray-900">
              Automate Business Workflows
            </p>
          </div>

          {/* Bottom-left */}
          <div
            className="w-[300px] h-[200px] rounded-3xl shadow-xl p-6 flex flex-col justify-evenly 
                       transform transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl ml-8"
            style={{
              background: "linear-gradient(135deg,#F0FFF4 0%, #D1FADF 100%)",
            }}
          >
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
                <Image
                  src={"/images/thirdpage_icons/triangle-arrow-bolt.svg"}
                  width={24}
                  height={24}
                  alt="sustainability-icon"
                />
              </div>
            </div>
            <p className="text-xl font-semibold text-center text-gray-900">
              Achieve Sustainability Goals
            </p>
          </div>
        </div>

        {/* CENTER COLUMN */}
        <div className="relative flex justify-center items-center">
          <div className="w-[200px] sm:w-[260px] md:w-[320px] lg:w-[380px] h-[120px] sm:h-[150px] md:h-[200px] lg:h-[240px] 
                          flex justify-center items-center overflow-hidden rounded-xl">
            <Image
              src="/images/Gemini.webp"
              alt="Gemini"
              width={600}
              height={400}
              className="object-contain transition-transform duration-300 ease-in hover:scale-110 rounded-2xl"
              priority
            />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col items-end justify-between h-[600px] pr-16">
          {/* Top-right */}
          <div
            className="w-[300px] h-[200px] rounded-3xl shadow-xl p-6 flex flex-col justify-evenly 
                       transform transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl mr-8"
            style={{
              background: "linear-gradient(135deg,#F5F3FF 0%, #E9D5FF 100%)",
            }}
          >
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
                <Image
                  src={"/images/thirdpage_icons/lightbulb-on.svg"}
                  width={24}
                  height={24}
                  alt="ai-icon"
                />
              </div>
            </div>
            <p className="text-xl font-semibold text-center text-gray-900">
              AI Document Summarization
            </p>
          </div>

          {/* Bottom-right */}
          <div
            className="w-[300px] h-[200px] rounded-3xl shadow-xl p-6 flex flex-col justify-evenly 
                       transform transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl mr-8"
            style={{
              background: "linear-gradient(135deg,#FFF7ED 0%, #FFEDD5 100%)",
            }}
          >
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
                <Image
                  src={"/images/thirdpage_icons/hard-disk-scan.svg"}
                  width={24}
                  height={24}
                  alt="scan-icon"
                />
              </div>
            </div>
            <p className="text-xl font-semibold text-center text-gray-900">
              Scan & Archive Solutions
            </p>
  </div>
</div>
  );
};

export default ThirdPage;