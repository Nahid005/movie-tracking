export default function SearchBox({onHandleSearch}) {
    return <div className="serch-bar">
    <input onChange={(e) => onHandleSearch(e.target.value) } type="text" name="search-movie" id="search-movie" className="bg-purple-700 shadow border-0 rounded-md p-2 w-full" placeholder="Search movie here..." />
</div>
}