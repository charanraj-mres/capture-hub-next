"use client";
import Image from "next/image";

const Cook = () => {
  return (
    <section className="relative" id="cook-section">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md">
        <div className="absolute right-0 bottom-[-18%] hidden lg:block">
          <Image
            src={"/images/cook/burger.png"}
            alt="burger-image"
            width={463}
            height={622}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 my-16 space-x-5">
          <div className="col-span-6 flex justify-start">
            <Image
              src="/images/cook/cook.png"
              alt="nothing"
              width={636}
              height={808}
            />
          </div>
          <div className="col-span-6 flex flex-col justify-center">
            <p className="text-primary text-lg font-normal mb-3 tracking-widest uppercase text-start">
              work with us
            </p>
            <h2 className="text-3xl lg:text-5xl font-semibold text-black dark:text-white text-start">
              Capture together with the expert.
            </h2>
            <p className="text-black/50 dark:text-white/50 md:text-lg font-normal mb-10 text-start mt-2">
              We are dedicated to give 100% worthfull memories to our clients.
              Each and every moment is captured with the best quality. Your
              satisfaction is our priority. The memories are captured with the
              best quality camera.
            </p>
            <p className="text-black/50 dark:text-white/50 md:text-lg font-normal mb-10 text-start mt-1">
              The pictures says everything. The photo is very high quality and
              very beautiful. We deliver the album on time without any delay. Qr
              code is provided with best quality soft copy. Service is provided
              at a very low price.
            </p>
            <button className="text-xl font-medium rounded-full text-white py-5 px-6 bg-primary lg:px-10 mr-6 w-fit border border-primary hover:bg-transparent hover:text-primary">
              Learn more
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cook;
