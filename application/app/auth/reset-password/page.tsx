"use client";
import React, { Fragment, useEffect, useRef, useState } from 'react'
import Card from '@/components/card/card'
import Flex from '@/components/flex/flex'
import Input from '@/components/input/input'
import { twMerge } from 'tailwind-merge'
import SecondaryButton from '@/components/button/button'
import { LinkButton } from '@/components/button/link'
import Section from '@/components/section/section'
import Form from '@/components/form/form'
import Div from '@/components/div/div'
import Span from '@/components/span/span'
import GroupImage from '@/components/auth-components/group-image'
import Main from '@/components/main/main'
import Header from '@/components/header/header'
import { useRouter } from 'next/navigation';

export default function ResetPassword() {
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

    // back button loading
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const clickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (isLoading) return;

        setIsLoading(true);

        timeoutRef.current = setTimeout(() => {
            router.push("/login");
        }, 500);
    }

    // back button time clear
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, []);

    return (
        <Fragment>
            <Section className={twMerge(
                "grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 w-full items-center",
                "font-sans dark:bg-black gap-0"
            )}>
                <GroupImage />
                <Main className={twMerge(
                    "min-h-screen w-full",
                )}>
                    <Header className={`z-40  ${isScroll ? 'bg-[repeating-linear-gradient(315deg,#80808010_0,#80808050_1px,transparent_0,transparent_100%)] bg-size-[5px_5px] mask-size-[50%] mask-image-[radial-gradient(ellipse_100%_100%_at_20%_20%,#000_80%,transparent_100%)] w-full border border-neutral-200 text-gray-800 font-bold items-center fixed top-0 inset-shadow-sm' : 'bg-[repeating-linear-gradient(315deg,#80808010_0,#80808050_1px,transparent_0,transparent_100%)] bg-size-[5px_5px] mask-size-[50%] mask-image-[radial-gradient(ellipse_100%_100%_at_20%_20%,#000_80%,transparent_100%)] w-full h-auto border border-neutral-200 text-gray-800 font-bold items-center fixed top-0 inset-shadow-sm'}`} style={{ backgroundColor: 'white' }}>
                        <Div className={twMerge(
                            "text-sm md:text-xl lg:text-2xl xl:text-2xl pt-1",
                            "text-gray-700 font-bold uppercase",
                            "tracking-wide drop-shadow-[2px_2px_0_rgba(0,0,0,0.2)] bg-linear-to-r from-emerald-800 to-indigo-400 text-transparent bg-clip-text"
                        )}>
                            <Div className={twMerge("w-170 h-16 flex justify-center items-center")}>
                                <Span>Reset Password</Span>
                            </Div>
                        </Div>
                    </Header>
                    <Flex justifycontent="between" items="center">
                        <Card className={twMerge("w-full mx-30 my-30 shadow-sm hover:shadow-sm rounded-md aspect-video")}>
                            <Form className="gird grid-cols-1 gap-4 p-5">
                                <Div className={twMerge("input-group mb-5")}>
                                    <Input
                                        type="email"
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
                                <Div className={twMerge("input-group mb-5")}>
                                    <Input
                                        type="password"
                                        className={twMerge(
                                            "ps-2 pt-1",
                                            "input_email bg-white border border-[rgba(0,128,255,0.2)] text-gray-900 text-sm rounded-lg",
                                            "focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        )}
                                        placeholder=" "
                                    />
                                    <label htmlFor="create-password" className={twMerge(
                                        "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    )}>Create Password</label>
                                </Div>
                                <Div className={twMerge("input-group mb-5")}>
                                    <Input
                                        type="password"
                                        className={twMerge(
                                            "ps-2 pt-1 pb-1",
                                            "input_email bg-white border border-[rgba(0,128,255,0.2)] text-gray-900 text-sm rounded-lg",
                                            "focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        )}
                                        placeholder=" "
                                    />
                                    <label htmlFor="confrim-password" className={twMerge(
                                        "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    )}>Confrim Password</label>
                                </Div>
                                <Div className='flex justify-between items-center'>
                                    <SecondaryButton onClick={clickButton} className={twMerge(
                                        "text-white font-medium text-sm cursor-pointer",
                                        isLoading && 
                                        "pointer-events-none opacity-60 cursor-not-allowed",
                                        "w-32"
                                    )}>
                                        {isLoading ? (
                                            <Div className="flex items-center justify-center max-w-20 gap-1">
                                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                <Span>Loading...</Span>
                                            </Div>
                                        ) : (
                                            <Span>Back To Login</Span>
                                        )}
                                    </SecondaryButton>
                                    <SecondaryButton className="cursor-pointer w-36">
                                        <Span>Reset Password</Span>
                                    </SecondaryButton>
                                </Div>
                            </Form>
                        </Card>
                    </Flex>
                </Main>
            </Section>
        </Fragment>
    )
}
