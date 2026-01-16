import { LoaderIcon, SearchIcon } from "lucide-react";
import Div from "../div/div";
import { Input } from "../ui/input";
import { InputGroup, InputGroupAddon } from "../ui/input-group";
import SecondaryButton from "../button/button";
import Span from "../span/span";
import { twMerge } from "tailwind-merge";
import { JSX } from "react";

function HeaderSearch():JSX.Element{

    return <Div className="flex w-full justify-between items-center">
        <InputGroup className="rounded-l-full shadow-xs h-7 w-300">
            <Input className={twMerge(
                "px-2 py-1 h-7 bg-transparent focus-visible:ring-0 focus:outline-none",
                "border-none"
            )} placeholder="Search..." />
            <InputGroupAddon>
                <SearchIcon />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
                <LoaderIcon className="animate-spin hidden" />
            </InputGroupAddon>
        </InputGroup>
        <SecondaryButton 
            className="rounded-r-full p-1 w-68 text-center"
            
        >
            <Span>Search</Span>
        </SecondaryButton>
    </Div>;
}

export default HeaderSearch;