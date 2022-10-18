import React, {MutableRefObject, useCallback} from "react";

export const useDebounce = (callback: (...args: any) => void, delay: number) => {
    const timer = React.useRef<NodeJS.Timer | null>()

    const debouncedCallback = useCallback((...args: any) => {
        if (timer.current) {
            clearTimeout(timer.current)
        }
        timer.current = setTimeout(() => {
            callback(...args)
        }, delay)
    }, [callback, delay])

    return debouncedCallback
}