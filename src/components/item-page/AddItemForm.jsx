export default function addItemForm(props) {
    function handelFileInput(e) {
        const files = e.target.files;
        const imageUrl = URL.createObjectURL(files[0]);
        props.setImage(imageUrl);
        document.querySelector(".file-upload").textContent = "Change picture";
    }

    function handelSubmit(e) {
        console.log("Form submitted!");
        e.preventDefault();
    }

    return (
        <form onSubmit={handelSubmit}>
            <input type="text" name="name" id="name" aria-label="name" placeholder="Title" maxLength={50} onChange={(e) => { props.setTitle(e.target.value) }} autoFocus required />
            <input type="number" name="price" id="price" placeholder="Price (SGD)" min={0} max={1000} step={0.01} aria-label="price" onChange={(e) => { props.setPrice(e.target.value) }} required />
            <label htmlFor="date">Available until</label>
            <input type="date" name="date" id="date" placeholder="Available until" aria-label="date" onChange={(e) => { props.setDate(e.target.value) }} />
            <label htmlFor="picture" className="file-upload">Add image</label>
            <input type="file" name="picture" id="picture" accept="image/*" aria-label="picture" onChange={handelFileInput} />
            <label htmlFor="description">Listing Info</label>
            <textarea name="description" id="description" aria-label="description" maxLength={500} placeholder="Description (max 500 characters)" onChange={(e) => { props.setDescription(e.target.value) }} />
            <button type="submit">Submit</button>
        </form>
    )
}