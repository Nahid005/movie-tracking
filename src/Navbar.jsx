export default function Navbar({children}) {
    return (
        <nav className="bg-purple-900 rounded-md p-4 grid grid-cols-3 justify-between items-center gap-2">
        {children}
        </nav>
    )
}
