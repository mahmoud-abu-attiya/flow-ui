/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function SignUp() {
   const [usernameValidations, setUsernameValidations] = useState(true);
   const [emailValidations, setEmailValidations] = useState(true);
   const [passwordValidations, setPasswordValidations] = useState(true);
   const [matchPassword, setMatchPassword] = useState(true);
   const [loading, setLoading] = useState(false);
   const [seePassword, setSeePassword] = useState(false);
   const router = useRouter();

   const SubmitForm = (e) => {
      let formData = new FormData(e.target);
      const data = Object.fromEntries(formData);
      e.preventDefault();
      setLoading(true);

      // validate username
      let usernameRegex = /^\D[a-z|0-9]{3,15}\D$/gi;
      setUsernameValidations(usernameRegex.test(data.username));

      // validate email
      let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/g;
      setEmailValidations(emailRegex.test(data.email));

      // validate password
      let passwordRegex =
         /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;
      setPasswordValidations(passwordRegex.test(data.password));
      if (data.password !== data.password_confirmation) {
         setMatchPassword(false);
         setLoading(false);
      } else {
         setMatchPassword(true);
      }

      console.log(usernameRegex.test(data.username), emailRegex.test(data.email), passwordRegex.test(data.password), data.password === data.password_confirmation);

      if (
         usernameRegex.test(data.username) &&
         emailRegex.test(data.email) &&
         passwordRegex.test(data.password) &&
         data.password === data.password_confirmation
      ) {
         fetch("/api/hiring/tasks/register", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
         })
            .then((response) => response.json())
            .then((data) => {
               console.log("Success:", data);
               Cookies.set("email", data.email);
               router.push("/LogIn");
            })
            .catch((error) => {
               console.error("Error:", error);
               setLoading(false);
            });
      } else {
         setLoading(false);
      }
   };
   return (
      <div className="container">
         <section>
            <div className="img-container rounded-xl overflow-hidden">
               <img
                  src="/images/for-desktop/Create-Account.svg"
                  alt="hero"
                  className="w-full h-full object-cover"
               />
            </div>
            <div className="flex flex-col gap-6 justify-center text-center md:text-start">
               <h1 className="text-3xl md:text-5xl font-bold">Create Account</h1>
               <p className="text-base md:text-xl text-gray-700">
                  Go ahead and sign up, let everyone know how awesome you are!
               </p>
               <form id="signupForm" onSubmit={SubmitForm}>
                  <div className="mb-6">
                     <div className="relative">
                        <div className="inpIcon absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                           <i className="fal fa-user text-pri"></i>
                        </div>
                        <input
                           name="username"
                           type="text"
                           id="username"
                           className={
                              "bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3.5 " +
                              (!usernameValidations && "border-red-500")
                           }
                           placeholder="Username"
                           required
                        />
                     </div>
                     {!usernameValidations && (
                        <p className="text-red-500 text-sm">
                           Username must be between 5 and 15 characters and can
                           only contain letters and numbers and can not start or
                           end with numbers.
                        </p>
                     )}
                  </div>
                  <div className="mb-6">
                     <div className="relative">
                        <div className="inpIcon absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                           <i className="fal fa-envelope text-pri"></i>
                        </div>
                        <input
                           name="email"
                           type="email"
                           id="input-group-1"
                           className={
                              "bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3.5 " +
                              (!emailValidations && "border-red-500")
                           }
                           placeholder="Email"
                           required
                        />
                     </div>
                     {!emailValidations && (
                        <p className="text-red-500 text-sm">
                           Please enter a valid email address.
                        </p>
                     )}
                  </div>
                  <div className="mb-6">
                     <div className="relative mb-6">
                     <button type="button" onClick={() => setSeePassword(!seePassword)} className="absolute inset-y-0 right-2 flex items-center pl-3">
                           <i className={`fad ${seePassword ? "fa-eye-slash" : "fa-eye"} text-pri`}></i>
                        </button>
                        <div className="inpIcon absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                           <i className="fal fa-lock-alt text-pri"></i>
                        </div>
                        <input
                           name="password"
                           type={seePassword ? "text" : "password"}
                           id="password"
                           minLength={8}
                           className={
                              "bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3.5 " +
                              (!passwordValidations && "border-red-500")
                           }
                           placeholder="Password"
                           required
                        />
                     </div>
                     <div className="relative">
                        <div className="inpIcon absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                           <i className="fal fa-lock-alt text-pri"></i>
                        </div>
                        <input
                           name="password_confirmation"
                           type="password"
                           id="password_confirmation"
                           minLength={8}
                           className={
                              "bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3.5 " +
                              (!passwordValidations && "border-red-500")
                           }
                           placeholder="Confirm Password"
                           required
                        />
                     </div>
                     {!matchPassword && (
                        <p className="text-red-500 text-sm">
                           Passwords do not match.
                        </p>
                     )}
                     {!passwordValidations && (
                        <p className="text-red-500 text-sm">
                           The Password must contain at least one uppercase,
                           lowercase letter, number, symbol and minimum 8
                           characters.
                        </p>
                     )}
                  </div>
                  <button
                     type="submit"
                     className="btn w-full text-white font-bold py-4 rounded-xl transition hover:bg-pri shadow-xl"
                  >
                     {loading ? (
                        <div role="status" className="w-fit mx-auto">
                           <svg
                              aria-hidden="true"
                              className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                           >
                              <path
                                 d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                 fill="currentColor"
                              />
                              <path
                                 d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                 fill="currentFill"
                              />
                           </svg>
                           <span className="sr-only">Loading...</span>
                        </div>
                     ) : (
                        "Create Account"
                     )}
                  </button>
               </form>
            </div>
         </section>
      </div>
   );
}
