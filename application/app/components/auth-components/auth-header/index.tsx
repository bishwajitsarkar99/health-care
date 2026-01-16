import React from 'react';
import Header from '@/components/header/header';
import { twMerge } from 'tailwind-merge';

export default function AuthHeader() {
  return (
    <Header className={twMerge("h-full")} />
  )
}
