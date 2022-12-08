/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function Home() {
   return (
      <div className="container">
         <section>
            <div className="img-container rounded-lg overflow-hidden">
               <img
                  src="/images/for-desktop/welcome.svg"
                  alt="hero"
                  className="w-full h-full object-cover"
               />
            </div>
            <div className="flex flex-col gap-6 justify-center text-center md:text-start">
               <h1 className="text-3xl md:text-5xl font-bold">Welcome</h1>
               <p className="text-base md:text-xl text-gray-700">
                  We’re glad you’re here! Sign up to start.
               </p>
               <Link href="SignUp">
               <button className="btn w-full text-white font-bold py-4 rounded-xl transition hover:bg-pri shadow-xl">
               Get Started
               </button>
            </Link>
            </div>
         </section>
      </div>
   );
}
