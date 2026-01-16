"use client";
import React, { Fragment, useEffect, useRef } from 'react'
import Card from '../../components/card/card'
import Flex from '../../components/flex/flex'
import Input from '../../components/input/input'
import { twMerge } from 'tailwind-merge'
import SecondaryButton from '../../components/button/button'
import { LinkButton } from '../../components/button/link'
import Section from '../../components/section/section'
import Form from '../../components/form/form'
import Div from '../../components/div/div'
import Span from '../../components/span/span'
import GroupImage from '../../components/auth-components/group-image'
import Main from '../../components/main/main'
import Header from '../../components/header/header';
import { DefaultImage, SeletonImage } from '../../components/default-imge';
import { Progress } from "../../components/ui/progress"
import MaskedInput from '../../components/input-mask/input-mask';
import { useRouter } from "next/navigation"

export default function CreateAccount() {
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
    // progress bar
    const [progress, setProgress] = React.useState(0);
    const [isUploading, setIsUploading] = React.useState(false);
    const [isUploaded, setIsUploaded] = React.useState(false);
    const [previewImage, setPreviewImage] = React.useState<string | null>(null);
    const [file, setFile] = React.useState<File | null>(null);
    // buttong loading
    const [isLoading, setIsLoading] = React.useState(false);
    const router = useRouter();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    const [error, setError] = React.useState<string | null>(null);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (isLoading) return;

        setIsLoading(true);

        timeoutRef.current = setTimeout(() => {
            router.push("/login");
        }, 500)
    }

    // Clear timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, []);

    // on change handeler
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];

        // reset option
        if (!selectedFile) {
            setFile(null);
            setPreviewImage(null);
            setIsUploaded(false);
            setProgress(0);
            return;
        }
        // Select file
        setFile(selectedFile);
        setPreviewImage(URL.createObjectURL(selectedFile));
        setIsUploaded(false);
        setProgress(0);
    };
    // image upload
    const handleUpload = () => {
        if (!file || isUploading) return;
        setIsUploading(true);
        setProgress(0);
        setIsUploaded(false);

        let value = 0;

        const interval = setInterval(() => {
            value += 10;

            if (value >= 100) {
                setProgress(100);
                clearInterval(interval);
                setIsUploading(false);
                setIsUploaded(true);

            } else {
                setProgress(value);
            }
        }, 1000);
    };

    // async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    //     e.preventDefault();
    //     setError(null);

    //     const formData = new FormData(e.currentTarget);
    //     const firstName = formData.get("firstName") as string;
    //     const lastName = formData.get("lastName") as string;
    //     const res = await signUp.email({
    //         name: `${firstName} ${lastName}`,
    //         email: formData.get("email") as string,
    //         password: formData.get("password") as string,
    //     });

    //     if (res.error) {
    //     setError(res.error.message || "Something went wrong.");
    //     } else {
    //     router.push("/admin/dashboard");
    //     }
    // }


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
                                <Span>Create Account</Span>
                            </Div>
                        </Div>
                    </Header>
                    <Flex justifycontent="between" items="center" className={twMerge("mx-10 my-24")}>
                        <Card className={twMerge("w-full shadow-sm hover:shadow-sm rounded-md aspect-video")}>
                            <Form className="gird grid-cols-1 gap-4 p-5">
                                <Flex direction="row" justify="center" gap={4}>
                                    <Div className={twMerge("input-group mb-5 w-full")}>
                                        <Input
                                            type="text"
                                            name="firstName"
                                            className={twMerge(
                                                "w-full",
                                                "ps-2 pt-1 pb-1",
                                                "input_email bg-white border border-[rgba(0,128,255,0.2)] text-gray-900 text-sm rounded-lg",
                                                "focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                            )}
                                            placeholder=" "
                                            autoComplete="off"
                                        />
                                        <label htmlFor="first-name" className={twMerge(
                                            "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        )}>First Name</label>
                                    </Div>
                                    <Div className={twMerge("input-group mb-5 w-full")}>
                                        <Input
                                            type="text"
                                            name="lastName"
                                            className={twMerge(
                                                "w-full",
                                                "ps-2 pt-1 pb-1",
                                                "input_email bg-white border border-[rgba(0,128,255,0.2)] text-gray-900 text-sm rounded-lg",
                                                "focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                            )}
                                            placeholder=" "
                                            autoComplete="off"
                                        />
                                        <label htmlFor="last-name" className={twMerge(
                                            "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        )}>Last Name</label>
                                    </Div>
                                </Flex>
                                <Div className={twMerge("input-group mb-5")}>
                                    <Input
                                        type="email"
                                        name="email"
                                        className={twMerge(
                                            "ps-2 pt-1 pb-1",
                                            "input_email bg-white border border-[rgba(0,128,255,0.2)] text-gray-900 text-sm rounded-lg",
                                            "focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        )}
                                        placeholder=" "
                                    />
                                    <label htmlFor="email" className={twMerge(
                                        "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    )}>Your email</label>
                                </Div>
                                <Flex direction="row" justify="between">
                                    <Div className='w-full'>
                                        <Div className={twMerge("input-group mb-5")}>
                                            <MaskedInput
                                                name="contractNumber"
                                                mask="+880 ____-______"
                                                className={twMerge(
                                                    "w-full",
                                                    "ps-2 pt-1 pb-1",
                                                    "input_phone bg-white border border-[rgba(0,128,255,0.2)] text-gray-900 text-sm rounded-lg",
                                                    "focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                )}
                                                placeholder=" "
                                            />
                                            <label htmlFor="contract-number" className={twMerge(
                                                "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            )}>Contract Number</label>
                                        </Div>
                                        <Div className={twMerge("input-group mb-5")}>
                                            <Input
                                                type="password"
                                                name="password"
                                                className={twMerge(
                                                    "ps-2 pt-1 pb-1",
                                                    "input_password bg-white border border-[rgba(0,128,255,0.2)] text-gray-900 text-sm rounded-lg",
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
                                                name="confrimPassword"
                                                className={twMerge(
                                                    "ps-2 pt-1 pb-1",
                                                    "input_confrim_password bg-white border border-[rgba(0,128,255,0.2)] text-gray-900 text-sm rounded-lg",
                                                    "focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                )}
                                                placeholder=" "
                                            />
                                            <label htmlFor="confrim-password" className={twMerge(
                                                "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            )}>Confrim Password</label>
                                        </Div>
                                        <Div className={twMerge("mb-5")}>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className={twMerge(
                                                    "ps-2 pt-1 pb-1 rounded-md cursor-pointer border border-[rgba(0,128,255,0.2)]"
                                                )}
                                            />
                                        </Div>
                                        <Div>
                                            <SecondaryButton
                                                type="button"
                                                className="cursor-pointer w-full"
                                                onClick={handleUpload}
                                                disabled={isUploading}
                                            >
                                                {isUploading ? (
                                                    <Div className="flex items-center justify-center gap-2">
                                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                        <Span>Uploading...</Span>
                                                    </Div>
                                                ) : (
                                                    <Span>Upload</Span>
                                                )}
                                            </SecondaryButton>
                                        </Div>
                                    </Div>
                                    <Div>
                                        <Div className={twMerge(
                                            "relative collapse-full-hover",
                                            "p-5 w-48 h-58 shadow-sm bg-[oklch(95% 0 0)] border border-[rgba(0,128,255,0.1)] rounded-md",
                                            "bg-[linear-gradient(90deg, #0000 0% 40%, var(--color-base-100) 50%, #0000 80% 100%)]",
                                            "bg-size-[400% 100%] mask-image-[radial-gradient(ellipse_130%_130%_at_50%_50%,#000_80%,transparent_100%)] bg-blend-lighten"
                                        )}>
                                            {/* Default image */}
                                            {!previewImage && !isUploading && !isUploaded && (
                                                <DefaultImage className="h-40 w-36 ms-0.5 rounded-md object-cover" />
                                            )}

                                            {/* Progress bar */}
                                            {isUploading && (
                                                <Div>
                                                    <SeletonImage />
                                                    <Div className="w-full mt-2">
                                                        <Progress value={progress} className="w-full" />
                                                        <Div className="text-center text-xs text-gray-600 mt-1">
                                                            Uploading: {progress}%
                                                        </Div>
                                                    </Div>
                                                </Div>
                                            )}

                                            {/* Preview image (ONLY after upload completed) */}
                                            {previewImage && isUploaded && (
                                                <Div>
                                                    <img
                                                        src={previewImage}
                                                        alt="Preview"
                                                        className="h-40 w-36 rounded-md object-cover"
                                                    />
                                                    <Span className={
                                                        twMerge(
                                                            "text-emerald-500 font-medium text-xs bg-emerald-100 p-1 rounded-md ms-3",
                                                        )
                                                    }>Upload Completed !</Span>
                                                </Div>

                                            )}
                                        </Div>
                                    </Div>
                                </Flex>
                                <Div className="col-span-1 mb-3 mt-3">
                                    <SecondaryButton type="submit" className="cursor-pointer w-full">
                                        <Span>Submit</Span>
                                    </SecondaryButton>
                                </Div>
                                <Div className='flex justify-center items-center'>
                                    <SecondaryButton
                                        onClick={handleClick}
                                        className={twMerge(
                                            "text-white font-medium text-sm w-full flex items-center justify-center gap-2",
                                            isLoading && "pointer-events-none opacity-60 cursor-not-allowed"
                                        )}
                                    >
                                        {isLoading ? (
                                            <Div className="flex items-center justify-center gap-2">
                                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                <Span>Loading...</Span>
                                            </Div>
                                        ) : (
                                            <Span>Back To Login</Span>
                                        )}
                                    </SecondaryButton>
                                </Div>
                            </Form>
                        </Card>
                    </Flex>
                </Main>
            </Section>
        </Fragment >
    )
}
