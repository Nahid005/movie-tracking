export default function Box({children}) {
    return (
        <div className="bg-gray-700 rounded shadow">
            {children}
        </div>
    )
}