export default function addItemForm() {
    return (
        <form>
            <label htmlFor="name">Item name:</label>
            <input type="text" placeholder="e.g. Sunglasses" name="name" id="name" />
            <label htmlFor="picture">Item picture:</label>
            <input type="file" name="picture" id="picture" accept="image/*" />
            <input type="number" name="price" id="price" />
        </form>
    )
}