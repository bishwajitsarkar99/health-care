"use client"

import * as React from "react"
import { useMask } from "@react-input/mask"
import Input from '../../components/input/input'

interface MaskedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  mask: string
}

const MaskedInput = React.forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ mask, ...props }, forwardedRef) => {
    const ref = useMask({
      mask,
      replacement: { _: /\d/ },
    })

    return <Input {...props} ref={ref} />
  }
)

MaskedInput.displayName = "MaskedInput"

export default MaskedInput
