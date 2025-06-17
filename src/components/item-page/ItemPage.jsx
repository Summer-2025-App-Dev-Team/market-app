import '../../assets/css/itempage.css';
import FilterBar from "./FilterBar";
import Service from "./Service";
import StackGrid from "react-stack-grid";

export default function ItemPage() {
    return (
        <>
            <main className="item-page">
                <div className="title">
                    <h1>Services</h1>
                    <h2>or Goods</h2>
                </div>
                <p className="description">This platform showcases the talents and entrepreneurial spirit of SAS students, offering high-quality services across a range of fields. Whether you're seeking digital solutions, creative work, or technical support, each listing reflects dedication, skill, and a commitment to excellence.</p>
                <FilterBar />
                <div className="service-grid">
                    <Service />
                    <Service />
                    <Service />
                    <Service />
                    <Service />
                    <Service />
                    <Service />
                </div>
            </main>
        </>
    )
}
