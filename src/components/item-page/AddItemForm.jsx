export default function addItemForm() {
    function handelFileInput(e) {
        const files = e.target.files;

        const prevFile = document.querySelector(".preview-image").querySelector("img");
        if (prevFile) {
            prevFile.remove();
        }

        for (const file of files) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.maxWidth = '200px';
                document.querySelector(".preview-image").appendChild(img);
            }

            reader.readAsDataURL(file);
        }

        document.querySelector(".file-upload").textContent = "Change picture";
    }

    return (
        <form>
            <h1>Item info</h1>
            <label htmlFor="name">Item name</label>
            <input type="text" name="name" id="name" aria-label="name" autoFocus />
            <div className="inputs">
                <div className="input">
                    <label htmlFor="price">Itme price (SGD)</label>
                    <input type="number" name="price" id="price" aria-label="price" />
                </div>
                <div className="input">
                    <label htmlFor="date">Listed until</label>
                    <input type="date" name="date" id="date" aria-label="date" />
                </div>
            </div>
            <label htmlFor="picture" className="file-upload">Upload picture</label>
            <input type="file" name="picture" id="picture" accept="image/*" aria-label="picture" onChange={handelFileInput} />
            <div className="preview-image"></div>
            <label htmlFor="description">Description</label>
            <input type="number" name="description" id="description" aria-label="description" />
            <button type="submit">Submit</button>
        </form>
    )
}