import FilterButton from "./FilterButton"

export default function FilterBar() {
    return (
        <div className="scroll-wrapper">
            <div className="scroll-container" style={{ "--show-before-shadow": 0 }}>
                <FilterButton name="Website Design" />
                <FilterButton name="Website Design" />
                <FilterButton name="Website Design" />
                <FilterButton name="Website Design" />
                <FilterButton name="Website Design" />
                <FilterButton name="Website Design" />
            </div>
        </div>
    )
}