import React, { ElementType, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface DefaultImageProps {
    className? : string;
    children? : ReactNode;
    [key: string] : any;
}

export const DefaultImage = (props: DefaultImageProps) => {

    const {className, children, ...rest} = props;

    return (
        <div>
            <svg className={twMerge(
                "rounded-md",
                className,
            )} shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 512">
                <path fill="#D0D0D0" d="M0 0h512v512H0z"/>
                <path fill="#B1B1B1" d="M86.655 416.22c7.264-94.069 37.323-70.129 106.837-113.622 21.47 44.795 108.726 48.051 126.619 0 59.99 38.35 105.701 16.656 105.23 113.622H86.655zm123.222-117.155c-.926-1.202 2.423-9.452 3.216-10.787-9.081-8.081-16.258-16.235-17.788-33.013l-.973.02c-2.249-.03-4.418-.547-6.449-1.704-3.252-1.85-5.539-5.025-7.084-8.606-3.27-7.514-14.042-32.452 2.37-30.481-9.177-17.137 11.592-46.413-24.228-57.241 29.389-37.222 91.398-94.614 136.841-37.044 49.739 4.82 65.255 63.932 31.762 96.307 1.962.071 3.811.523 5.448 1.399 6.226 3.335 6.43 10.574 4.794 16.646-1.619 5.073-3.676 8.505-5.614 13.45-2.359 6.676-5.806 7.919-12.467 7.2-.338 16.507-7.967 24.609-18.233 34.307l2.809 9.517c-13.767 29.202-70.958 30.377-94.404.03z"/>
            </svg>
            {children}
        </div>
    )
}

interface SkeletonImageProps {
    className? : string;
    children? : ReactNode;
    [key: string] : any;
}

export const SeletonImage = (props: SkeletonImageProps) => {

    const {className, children, ...rest} = props;

    return (
        <div className={twMerge("skeleton p-10")}>
            <svg className={twMerge(
                "rounded-md icon",
                className,
            )} width="4.5em" height="5em" viewBox="0 0 1024 1024"  version="1.1">
                <path d="M878.3 192.9H145.7c-16.5 0-30 13.5-30 30V706c0 16.5 13.5 30 30 30h732.6c16.5 0 30-13.5 30-30V222.9c0-16.5-13.5-30-30-30z" fill="#FFFFFF" />
                <path d="M145.7 736h732.6c16.5 0 30-13.5 30-30v-22.1H115.7V706c0 16.6 13.5 30 30 30z" fill="#f3f3f3" />
                <path d="M878.3 152.9H145.7c-38.6 0-70 31.4-70 70V706c0 38.6 31.4 70 70 70h732.6c38.6 0 70-31.4 70-70V222.9c0-38.6-31.4-70-70-70z m30 531V706c0 16.5-13.5 30-30 30H145.7c-16.5 0-30-13.5-30-30V222.9c0-16.5 13.5-30 30-30h732.6c16.5 0 30 13.5 30 30v461zM678 871.1H346c-11 0-20-9-20-20s9-20 20-20h332c11 0 20 9 20 20s-9 20-20 20z" fill="lightgray" />
                <path d="M127.1 662.7c-2.7 0-5.4-1.1-7.3-3.2-3.7-4.1-3.5-10.4 0.6-14.1l236.5-219.6L463 541.9l258.9-290.7 183.7 196.3c3.8 4 3.6 10.4-0.4 14.1-4 3.8-10.3 3.6-14.1-0.4L722.3 280.8l-259 290.9L355.7 454 133.9 660c-2 1.8-4.4 2.7-6.8 2.7z" fill="lightgray" />
                <path d="M156.4 541.9a82.7 82.8 0 1 0 165.4 0 82.7 82.8 0 1 0-165.4 0Z" fill="#f3f3f3" />
                <path d="M179.8 541.9a59.3 59.3 0 1 0 118.6 0 59.3 59.3 0 1 0-118.6 0Z" fill="lightgray" />
                <path d="M208.9 541.9a30.2 30.3 0 1 0 60.4 0 30.2 30.3 0 1 0-60.4 0Z" fill="#f3f3f3" />
                <path d="M580.9 329.9a82.7 82.8 0 1 0 165.4 0 82.7 82.8 0 1 0-165.4 0Z" fill="#f1f1f1" />
                <path d="M604.3 329.9a59.3 59.3 0 1 0 118.6 0 59.3 59.3 0 1 0-118.6 0Z" fill="lightgray" />
                <path d="M633.4 329.9a30.2 30.3 0 1 0 60.4 0 30.2 30.3 0 1 0-60.4 0Z" fill="white" />
                <path d="M719.3 539.6a46.3 46.4 0 1 0 92.6 0 46.3 46.4 0 1 0-92.6 0Z" fill="lightgray" />
                <path d="M732.4 539.6a33.2 33.2 0 1 0 66.4 0 33.2 33.2 0 1 0-66.4 0Z" fill="lightgray" />
                <path d="M748.7 539.6a16.9 17 0 1 0 33.8 0 16.9 17 0 1 0-33.8 0Z" fill="white" />
                <path d="M436.8 720.1H275.2c-5 0-9-4-9-9s4-9 9-9h161.6c5 0 9 4 9 9 0 4.9-4.1 9-9 9zM220.6 720.1h-26.5c-5 0-9-4-9-9s4-9 9-9h26.5c5 0 9 4 9 9 0 4.9-4.1 9-9 9z" fill="#FFFFFF" />
            </svg>
            {children}
        </div>
    )
}

interface ProfileImageProps {
    className? : string;
    children? : ReactNode;
    [key: string] : any;
}

export const ProfileImage = (props: ProfileImageProps) => {

    const {className, children, ...rest} = props;

    return (
        <div className={twMerge(
            "p-10",
            "bg-white bg-[repeating-linear-gradient(315deg,#80808010_0,#80808050_1px,transparent_0,transparent_60%)] bg-size-[5px_5px]",
            "mask-size-[50%] mask-image-[radial-gradient(ellipse_100%_100%_at_20%_20%,#000_80%,transparent_100%)]",
            )}>
            <svg className={twMerge(
                "rounded-md icon",
                className,
            )} width="4.5em" height="5em" viewBox="0 0 1024 1024"  version="1.1">
                <path d="M878.3 192.9H145.7c-16.5 0-30 13.5-30 30V706c0 16.5 13.5 30 30 30h732.6c16.5 0 30-13.5 30-30V222.9c0-16.5-13.5-30-30-30z" fill="#FFFFFF" />
                <path d="M145.7 736h732.6c16.5 0 30-13.5 30-30v-22.1H115.7V706c0 16.6 13.5 30 30 30z" fill="#f3f3f3" />
                <path d="M878.3 152.9H145.7c-38.6 0-70 31.4-70 70V706c0 38.6 31.4 70 70 70h732.6c38.6 0 70-31.4 70-70V222.9c0-38.6-31.4-70-70-70z m30 531V706c0 16.5-13.5 30-30 30H145.7c-16.5 0-30-13.5-30-30V222.9c0-16.5 13.5-30 30-30h732.6c16.5 0 30 13.5 30 30v461zM678 871.1H346c-11 0-20-9-20-20s9-20 20-20h332c11 0 20 9 20 20s-9 20-20 20z" fill="lightgray" />
                <path d="M127.1 662.7c-2.7 0-5.4-1.1-7.3-3.2-3.7-4.1-3.5-10.4 0.6-14.1l236.5-219.6L463 541.9l258.9-290.7 183.7 196.3c3.8 4 3.6 10.4-0.4 14.1-4 3.8-10.3 3.6-14.1-0.4L722.3 280.8l-259 290.9L355.7 454 133.9 660c-2 1.8-4.4 2.7-6.8 2.7z" fill="lightgray" />
                <path d="M156.4 541.9a82.7 82.8 0 1 0 165.4 0 82.7 82.8 0 1 0-165.4 0Z" fill="#f3f3f3" />
                <path d="M179.8 541.9a59.3 59.3 0 1 0 118.6 0 59.3 59.3 0 1 0-118.6 0Z" fill="lightgray" />
                <path d="M208.9 541.9a30.2 30.3 0 1 0 60.4 0 30.2 30.3 0 1 0-60.4 0Z" fill="#f3f3f3" />
                <path d="M580.9 329.9a82.7 82.8 0 1 0 165.4 0 82.7 82.8 0 1 0-165.4 0Z" fill="#f1f1f1" />
                <path d="M604.3 329.9a59.3 59.3 0 1 0 118.6 0 59.3 59.3 0 1 0-118.6 0Z" fill="lightgray" />
                <path d="M633.4 329.9a30.2 30.3 0 1 0 60.4 0 30.2 30.3 0 1 0-60.4 0Z" fill="white" />
                <path d="M719.3 539.6a46.3 46.4 0 1 0 92.6 0 46.3 46.4 0 1 0-92.6 0Z" fill="lightgray" />
                <path d="M732.4 539.6a33.2 33.2 0 1 0 66.4 0 33.2 33.2 0 1 0-66.4 0Z" fill="lightgray" />
                <path d="M748.7 539.6a16.9 17 0 1 0 33.8 0 16.9 17 0 1 0-33.8 0Z" fill="white" />
                <path d="M436.8 720.1H275.2c-5 0-9-4-9-9s4-9 9-9h161.6c5 0 9 4 9 9 0 4.9-4.1 9-9 9zM220.6 720.1h-26.5c-5 0-9-4-9-9s4-9 9-9h26.5c5 0 9 4 9 9 0 4.9-4.1 9-9 9z" fill="#FFFFFF" />
            </svg>
            {children}
        </div>
    )
}

export default {DefaultImage, SeletonImage, ProfileImage};
