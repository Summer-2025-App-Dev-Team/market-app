export default function addItemForm(props) {
    function handelFileInput(e) {
        const files = e.target.files;
        const imageUrl = URL.createObjectURL(files[0]);
        props.setImage(imageUrl);
        document.querySelector(".file-upload").textContent = "Change picture";
    }

    return (
        <form>
            <input type="text" name="name" id="name" aria-label="name" placeholder="Title" onChange={(e)=>{props.setTitle(e.target.value)}} autoFocus/>
            <input type="number" name="price" id="price" placeholder="Price (SGD)" aria-label="price" onChange={(e)=>{props.setPrice(e.target.value)}}/>
            <label htmlFor="date">Available until</label>
            <input type="date" name="date" id="date" placeholder="Available until" aria-label="date" onChange={(e)=>{props.setDate(e.target.value)}}/>
            <label htmlFor="picture" className="file-upload">Add image</label>
            <input type="file" name="picture" id="picture" accept="image/*" aria-label="picture" onChange={handelFileInput} />
            <label htmlFor="description">Listing Info</label>
            <textarea name="description" id="description" aria-label="description" onChange={(e)=>{props.setDescription(e.target.value)}}/>
            <button type="submit">Submit</button>
        </form>
    )
}