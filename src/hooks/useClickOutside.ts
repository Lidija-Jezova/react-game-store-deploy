import React from "react";

export const useClickOutside = (cb: any) => {
    const ref = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        let handler = (e: MouseEvent | TouchEvent) => {
            if (ref.current && !ref.current.contains(e.target as HTMLDivElement)) {
                cb()
            }
        }
        document.addEventListener('mousedown', handler)

        return () => {
            document.removeEventListener('mousedown', handler)
        }
    })

    return ref
}