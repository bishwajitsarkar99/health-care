"use client"

import { twMerge } from "tailwind-merge";
import Div from "../div/div";
import { Input } from "../ui/input";
import { InputGroup, InputGroupAddon } from "../ui/input-group";
import { SearchIcon, LoaderIcon } from "lucide-react";
import SecondaryButton from "../button/button";
import Span from "../span/span";
import { JSX, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"

function SearchInput(): JSX.Element {
    const router = useRouter()
    const params = useSearchParams()
    const [inputValue, setInputValue] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (inputValue.trim() !== "") return
    
        const hasSearch = params.get("search")
        if (!hasSearch) return
    
        const newParams = new URLSearchParams(params.toString())
        newParams.delete("search")
        newParams.set("page", "1")
        router.push(`?${newParams.toString()}`)
    
    }, [inputValue])
    

    return <Div className="flex w-full justify-between items-center">
        <InputGroup className="rounded-l-full shadow-xs w-full h-7">
            <Input 
            type="search"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={twMerge(
                "px-2 py-0 bg-transparent focus:ring-0 focus:outline-none h-7",
                "border-none",
                "focus-visible:ring-0 font-medium"
            )} placeholder="Search..." />
            <InputGroupAddon>
                <SearchIcon />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
                {loading && <LoaderIcon className="animate-spin" />}
            </InputGroupAddon>
        </InputGroup>
        <SecondaryButton 
            className="rounded-r-full p-1 w-32 text-center"
            onClick={() => {
                const q = inputValue.trim()
                const newParams = new URLSearchParams(params.toString())
      
                q ? newParams.set("search", q) : newParams.delete("search")
                newParams.set("page", "1")
                router.push(`?${newParams.toString()}`)
                // laoding settime
                let timer;
                setLoading(true)
                timer = setTimeout(() => {
                    setLoading(false)
                }, 500);
                
                return ()=> clearTimeout(timer);

            }}
            disabled={inputValue.trim() === "" && !params.get("search") || loading}
        >
            <Span>{loading ? "Searching..." : "Search"}</Span>
        </SecondaryButton>
    </Div>;
}

export default SearchInput;
