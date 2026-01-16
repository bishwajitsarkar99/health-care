'use client'

import { Label } from "../components/ui/label"
import Input from "../components/input/input"
import React, { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"
import Div from "./div/div"
import { ProfileImage, SeletonImage } from "./default-imge"
import { Progress } from "./ui/progress"
import Span from "./span/span"
import SecondaryButton from "./button/button"

interface ImageUploadProps {
    label: string
    value: string
    disabled?: boolean
    onFileSelected: (file: File) => void
}

export function ImageUpload({
    label,
    value,
    disabled,
    onFileSelected
}: ImageUploadProps) {
    // progress bar
    const [file, setFile] = React.useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null)
    const [isUploading, setIsUploading] = React.useState(false)
    const [isUploaded, setIsUploaded] = React.useState(false)
    const [progress, setProgress] = React.useState(0)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (!selectedFile) return
    
        setFile(selectedFile)
        setIsUploaded(false)
        setProgress(0)
    
        onFileSelected(selectedFile)
    
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string)
        }
        reader.readAsDataURL(selectedFile)
    }


    
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

    useEffect(() => {
        if (value) {
            setPreviewUrl(value)
            setIsUploaded(true)
            setProgress(100)
        }
    }, [value])

    return (
        <div className="mt-4">
            <div className="space-y-2">
                <Label className={twMerge(
                    "ms-2.5 ps-1",
                )} htmlFor="image">{label}</Label>
                <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={disabled}
                    className={twMerge(
                        "ps-3.5 pt-1 pb-1 rounded-md cursor-pointer border border-[rgba(0,128,255,0.2)]"
                    )}
                />
                <Div className={twMerge(
                    "text-xs font-medium text-muted-foreground w-full text-center",
                    "bg-white bg-[repeating-linear-gradient(315deg,#80808010_0,#80808050_1px,transparent_0,transparent_60%)] bg-size-[5px_5px]",
                    "mask-size-[50%] mask-image-[radial-gradient(ellipse_100%_100%_at_20%_20%,#000_80%,transparent_100%)]",
                )}>
                    <Span className="ps-1">
                        {label} will be uploaded at (JPEG, PNG, WEBP, or GIF, max 5MB).
                        <Span className="text-destructive">*</Span>
                    </Span>
                </Div>
                <Div className={twMerge(
                    "flex justify-center items-center"
                )}>
                    <Div className={twMerge(
                        "relative collapse-full-hover",
                        "p-5 w-48 h-58 shadow-xs bg-[oklch(95% 0 0)] border border-[rgba(0,128,255,0.10)] rounded-md",
                        "bg-[linear-gradient(90deg, #0000 0% 40%, var(--color-base-100) 50%, #0000 80% 100%)]",
                        "bg-size-[400% 100%] mask-image-[radial-gradient(ellipse_130%_130%_at_50%_50%,#000_80%,transparent_100%)] bg-blend-lighten"
                    )}>
                        {/* Default image */}
                        {!previewUrl && !isUploading && !isUploaded && (
                            <ProfileImage className="h-full w-full ms-0.5 rounded-md object-cover" />
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
                        {previewUrl && isUploaded && (
                            <Div>
                                <img
                                    src={previewUrl}
                                    alt={`${label} preview`}
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
            </div>
        </div>
    )
}