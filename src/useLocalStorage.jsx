import { useEffect, useState } from "react"

export default function useLocalStorage(initialState, key) {

    const [value, setValue] = useState(function() {
        const getData = localStorage.getItem(key);

        return getData ? JSON.parse(getData) : initialState;
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])

    return [value, setValue ]
}