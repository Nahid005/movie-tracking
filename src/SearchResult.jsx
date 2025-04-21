export default function SearchResult({movieLists}) {
    return <div className="result-numberof-move text-right">
    <p className="text-white font-medium text-base">Found {movieLists && movieLists.length} result</p>
</div>
}