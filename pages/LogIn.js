/* eslint-disable @next/next/no-img-element */
import Cookies from "js-cookie";

export default function SignUp() {
   return (
      <div className="container">
         <section>
            <div className="img-container rounded-xl overflow-hidden">
               <img
                  src="/images/for-desktop/login.svg"
                  alt="hero"
                  className="w-full h-full object-cover"
               />
            </div>
            <div className="flex flex-col gap-6 justify-center text-center md:text-start">
               <h1 className="text-3xl md:text-5xl font-bold">
                  Successfully logged in
               </h1>
               <a
                  href={`mailto:${Cookies.get("email")}`}
                  className="text-base md:text-xl text-[#1F1249] underline break-words"
               >
                  {Cookies.get("email")}
               </a>
            </div>
         </section>
      </div>
   );
}
