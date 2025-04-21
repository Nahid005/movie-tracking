export default function Box({children}) {
    return (
        <div className="bg-gray-700 h-screen rounded shadow">
            {children}
        </div>
    )
}