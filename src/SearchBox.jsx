import { useEffect, useRef } from "react"

export default function SearchBox({onHandleSearch, setQuery}) {

    const inputRef = useRef(null)

    useEffect(() => {
        const input = inputRef.current;
        input.focus()

        document.addEventListener('keydown', (e) => {
            if(e.key === "Enter") {
                setQuery('')
                input.focus()
            }
        })
    }, [setQuery])

    return <div className="serch-bar">
    <input ref={inputRef} onChange={(e) => onHandleSearch(e.target.value) } type="text" name="search-movie" id="search-movie" className="bg-purple-700 shadow border-0 rounded-md p-2 w-full" placeholder="Search movie here..." />
</div>
}