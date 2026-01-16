import React, { useState } from 'react'

export const useInputMask = (initialValue="") => {
    const [value, setValue] = useState(initialValue);

    const onchange = (e) => {
        setValue(e.target.value);
    };

    return {
        value,
        onchange,
    };
};

export default useInputMask;
