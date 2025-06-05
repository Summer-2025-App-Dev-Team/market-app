export default function () {
    return (
        <header>
            <nav>
                <a href="/" className="home-link">SAS Online Market</a>
                <form role="search">
                    <input type="search" placeholder="Search" />
                </form>
                <button type="button" className="btn btn-primary">Add item</button>
                <i className='bx bx-user-circle'></i> 
            </nav>
        </header>
    )
}