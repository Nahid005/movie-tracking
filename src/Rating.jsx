import { useState } from "react"

export default function Rating({maxLength = 5, onAddUserRating}) {

    const [rating, setRating] = useState(0);
    const [tempRating, setTempRating] = useState(0)

    function handleRating(userRating) {
        setRating(userRating)
        onAddUserRating(userRating)
    }

    function handleHoverIn(userRating) {
        setTempRating(userRating)
    }

    function handleHoverOut(userRating) {
        setTempRating(userRating)
    }

    return (
        <div className="flex items-center gap-2 bg-purple-300 rounded-lg text-center justify-center p-4 shadow">
            <div className="flex gap-1">
                {
                    Array.from({length : maxLength}, (_, i) => (
                        <Star 
                        key={i} 
                        index={i}
                        full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
                        onRate={handleRating} 
                        onHoverIn={handleHoverIn}
                        onHoverOut={handleHoverOut}
                        />
                    ))
                }
            </div>
            <span className="font-bold text-xl">({tempRating || rating || ' '})</span>
        </div>
    )
}

function Star({onRate, onHoverIn, onHoverOut, index, full}) {

    return <span className="w-8 h-8" 
    onClick={() => onRate(index + 1)} 
    onMouseEnter={() => onHoverIn(index + 1)}
    onMouseLeave={() => onHoverOut(0)}
    >
        {full ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#6C3BAA"><path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path></svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#6C3BAA"><path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26ZM12.0006 15.968L16.2473 18.3451L15.2988 13.5717L18.8719 10.2674L14.039 9.69434L12.0006 5.27502L9.96214 9.69434L5.12921 10.2674L8.70231 13.5717L7.75383 18.3451L12.0006 15.968Z"></path></svg>}
    </span>
}