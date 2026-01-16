"use client";
import React, { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import Card from "../components/card/card";
import Flex from "../components/flex/flex";
import Input from "../components/input/input";
import SecondaryButton from '../components/button/button';
import Section from "../components/section/section";
import Main from "../components/main/main";
import Div from "../components/div/div";
import Form from "../components/form/form";
import Span from "../components/span/span";
import AuthHeader from "../components/header/header";
import GroupImage from "../components/auth-components/group-image";
import { useRouter } from "next/navigation";
import { authService } from "../services/authService";
import toast from "react-hot-toast";

export default function LoginPage() {
  // scroll
  const [isScroll, setIsScroll] = React.useState(false);
  React.useEffect(() => {
    const chnageProperty = () => {
      if (window.scrollY >= 10) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    }
    window.addEventListener("scroll", chnageProperty);
    return () => window.removeEventListener("scroll", chnageProperty);
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isLoginButtonLoading, setIsLoginButtonLoading] = useState(false);
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authType, setAuthType] = useState<"session" | "jwt">("jwt");
  const [loading, setLoading] = useState(false);

  // change input email value
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };
  // change input password value
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };
  // create account button loading
  const handleCreateAccount = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    timeoutRef.current = setTimeout(() => {
      router.push("/auth/create-account");
    }, 500);

  };
  // create account button loading clear time out
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, []);

  // forget password button loading
  const handleForgetPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if(isButtonLoading) return;

    setIsButtonLoading(true);

    timeoutRef.current = setTimeout(() => {
      router.push("/auth/forget-password");
    }, 500);
  };
  // forget password button loading clear timeout
  useEffect(() => {
    return () => {
      if(timeoutRef.current){
        clearTimeout(timeoutRef.current)
      }
    }
  }, []);

  // login form submin
  // async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();

  // }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response;
      if (authType === "session") {
        response = await authService.loginSession({ email, password });
      } else {
        response = await authService.loginJWT({ email, password });
        localStorage.setItem("auth_token", response.data.token);
      }
      
      localStorage.setItem("auth_type", authType);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      toast.success(`Logged in successfully via ${authType.toUpperCase()}!`);
      router.push("/admin/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };


  return (

    <Section>

      <Section className={twMerge(
        "grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 w-full items-center",
        "font-sans dark:bg-black gap-0"
      )}>
        <GroupImage />
        <Main className={twMerge(
          "min-h-screen w-full",
        )}>
          <AuthHeader className={`z-40  ${isScroll ? 'bg-[repeating-linear-gradient(315deg,#80808010_0,#80808050_1px,transparent_0,transparent_100%)] bg-size-[5px_5px] mask-size-[50%] mask-image-[radial-gradient(ellipse_100%_100%_at_20%_20%,#000_80%,transparent_100%)] w-full border border-neutral-200 text-gray-800 font-bold items-center fixed top-0 inset-shadow-sm' : 'bg-[repeating-linear-gradient(315deg,#80808010_0,#80808050_1px,transparent_0,transparent_100%)] bg-size-[5px_5px] mask-size-[50%] mask-image-[radial-gradient(ellipse_100%_100%_at_20%_20%,#000_80%,transparent_100%)] w-full h-auto border border-neutral-200 text-gray-800 font-bold items-center fixed top-0 inset-shadow-sm'}`} style={{ backgroundColor: 'white' }}>
            <Div className={twMerge(
              "ms-30 text-sm md:text-xl lg:text-2xl xl:text-2xl pt-1",
              "text-gray-700 font-bold uppercase",
              "tracking-wide drop-shadow-[2px_2px_0_rgba(0,0,0,0.2)] bg-linear-to-r from-emerald-800 to-indigo-400 text-transparent bg-clip-text"
            )}>
              <Div className={twMerge("w-100 h-16 flex justify-center items-center")}>
                <Span>Login</Span>
              </Div>
            </Div>
          </AuthHeader>
          <Flex justifycontent="between" items="center">
            <Card className={twMerge("w-full mx-30 my-30 shadow-sm hover:shadow-sm rounded-md aspect-video")}>
              <Form onSubmit={handleLogin} className="flex flex-col gap-6 p-5">
                <Div className={twMerge("input-group")}>
                  <Input
                    name="email"
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={twMerge(
                      "ps-2 pt-1 pb-1",
                      "input_email bg-white border border-[rgba(0,128,255,0.2)] text-gray-900 text-sm rounded-lg",
                      "focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    )}
                    placeholder=" "
                  />
                  <label htmlFor="user-email" className={twMerge(
                    "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  )}>User Email</label>
                </Div>
                <Div className={twMerge("input-group")}>
                  <Input
                    name="password" 
                    id="password" 
                    type="password"
                    value={password}
                     onChange={(e) => setPassword(e.target.value)}
                    className={twMerge(
                      "ps-2 pt-1 pb-1",
                      "input_email bg-white border border-[rgba(0,128,255,0.2)] text-gray-900 text-sm rounded-lg",
                      "focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    )}
                    placeholder=" "
                  />
                  <label htmlFor="password" className={twMerge(
                    "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  )}>Password</label>
                </Div>
                <Div className={twMerge("flex justify-between items-center")}>
                  <SecondaryButton 
                    type="submit"
                    disabled={loading} 
                    className="cursor-pointer w-full"
                  >
                    <Span>Login</Span>
                  </SecondaryButton>
                </Div>
              </Form>
              <Div className="mx-5 flex justify-between items-center">
                <SecondaryButton
                  className={twMerge(
                    "text-white font-medium text-sm w-40",
                    isLoading && "pointer-events-none opacity-60 cursor-not-allowed",
                    "cursor-pointer"
                  )}
                  onClick={handleCreateAccount}
                >
                  {isLoading ? (
                    <Div className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <Span>Loading...</Span>
                    </Div>
                  ) : (<Span>Create Account</Span>)}
                </SecondaryButton>
                <SecondaryButton className={twMerge(
                  "text-white font-medium text-sm w-40",
                  isButtonLoading && 
                  "pointer-events-none opacity-60 cursor-not-allowed",
                  "cursor-pointer"
                )} onClick={handleForgetPassword}>
                  {isButtonLoading ? (
                    <Div className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <Span>Loading...</Span>
                    </Div>
                  ) : (
                    <Span>Forget Password</Span>
                  )}
                </SecondaryButton>
              </Div>
            </Card>
          </Flex>
        </Main>
      </Section>
    </Section>
  );
}
