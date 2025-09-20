import React from "react";
import Image from "next/image";

const secondPage = () => {
  return (
    <div className="p-4">
      <div className="flex justify-center">
        <h1 className="text-6xl mb-4 tracking-tight font-extrabold text-[#006A71] animate-fade-in-up drop-shadow-lg">
          Our Capabilities
        </h1>
      </div>

      <div className="max-w-8xl px-6 space-y-6">
        <div className="flex items-center gap-12 rounded-2xl shadow-lg ">
          <div className="flex-shrink-0">
            <Image
              src={"/images/1image.webp"}
              width={350}
              height={200}
              alt="AI Assistant"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl leading-relaxed">
              Our AI Assistant can help
              <span className="block text-3xl font-semibold text-[#00B2FF] mt-2 mb-3">
                streamline your KMRL operations
              </span>
              By providing instant access to processed knowledge and automating
              workflows, enhancing decision-making and efficiency.
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-12 ml-40 rounded-2xl shadow-lg ">
          <div className="flex-shrink-0">
            <Image
              src={"/images/2image.webp"}
              width={350}
              height={200}
              alt="Document Management"
              
            />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl leading-relaxed">
              Effortlessly manage your documents with our integrated platform.
              <span className="block text-3xl font-semibold text-[#00B2FF] mt-2">
                Edit, Comment, and Sign
              </span>
              PDFs seamlessly, from desktop to mobile with advanced
              collaboration tools.
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-12 ml-80 rounded-2xl shadow-lg ">
          <div className="flex-shrink-0">
            <Image
              src={"/images/3image.webp"}
              width={350}
              height={200}
              alt="Workflow Automation"
              
            />
          </div>
          <div className="flex">
            <h2 className="text-2xl leading-relaxed">
              Automate complex workflows and processes with intelligent routing.
              <span className="block text-3xl font-semibold text-[#00B2FF] mt-2">
                Smart Workflow Management
              </span>
              Reduce manual tasks and improve operational efficiency across all
              departments.
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default secondPage;
