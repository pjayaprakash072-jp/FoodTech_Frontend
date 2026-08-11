import { useRef, useState } from "react";
import { API_URI } from "../../data/apiPath";

const AddRGroup = () => {
    const [rgroupName, setRGroupName] = useState("");
    const [area, setArea] = useState("");
    const [category, setCategory] = useState([]);
    const [region, setRegion] = useState([]);
    const [offer, setOffer] = useState("");
    const [file, setFile] = useState(null);

    const [loading, setLoading] = useState(false);

    // Used to clear the file input
    const fileInputRef = useRef(null);


    // ==========================================
    // CATEGORY CHECKBOX
    // ==========================================

    const categoryCheckBoxHandler = (e) => {
        const value = e.target.value;

        if (category.includes(value)) {
            setCategory(
                category.filter((item) => item !== value)
            );
        } else {
            setCategory([...category,value]);
        }
    };


    // ==========================================
    // REGION CHECKBOX
    // ==========================================

    const regionCheckBoxHandler = (e) => {
        const value = e.target.value;

        if (region.includes(value)) {
            setRegion(
                region.filter((item) => item !== value)
            );
        } else {
            setRegion([...region,value]);
        }
    };


    // ==========================================
    // RESET FORM
    // ==========================================

    const resetForm = () => {
        setRGroupName("");
        setArea("");
        setCategory([]);
        setRegion([]);
        setOffer("");
        setFile(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };


    // ==========================================
    // SUBMIT FORM
    // ==========================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prevent double submission
        if (loading) {
            return;
        }


        // ==========================================
        // VALIDATION
        // ==========================================

        if (!rgroupName.trim()) {
            alert("Please enter restaurant name");
            return;
        }

        if (!area.trim()) {
            alert("Please enter area");
            return;
        }

        if (category.length === 0) {
            alert("Please select at least one category");
            return;
        }

        if (region.length === 0) {
            alert("Please select at least one region");
            return;
        }

        if (!file) {
            alert("Please select a restaurant image");
            return;
        }


        // ==========================================
        // GET TOKEN
        // ==========================================

        const token = localStorage.getItem("loginToken");

        if (!token) {
            alert("You are not authenticated. Please login again.");
            return;
        }


        try {

            setLoading(true);


            // ==========================================
            // CREATE FORMDATA
            // ==========================================

            const fd = new FormData();


            fd.append( "RGroupName" , rgroupName.trim() );

            fd.append( "area" , area.trim() );

            fd.append( "offer", offer.trim() );


            // ==========================================
            // CATEGORY
            // ==========================================

            category.forEach((item) => {
                fd.append("category", item);
            });


            // ==========================================
            // REGION
            // ==========================================

            region.forEach((item) => {
                fd.append("region", item);
            });


            // ==========================================
            // IMAGE
            // ==========================================

            if (file) {
                fd.append( "image" , file );
            }


            // ==========================================
            // API REQUEST
            // ==========================================

            const response = await fetch(
                `${API_URI}/rgroup/add-rgroup`,
                {
                    method: "POST",

                    headers: {
                        token: token
                    },

                    body: fd
                }
            );


            // ==========================================
            // READ RESPONSE
            // ==========================================

            const data = await response.json();


            // ==========================================
            // SUCCESS
            // ==========================================

            if (response.ok) {

                alert(
                    data.message ||
                    "Restaurant group added successfully"
                );


                // Store Restaurant ID
                if (data.RGroupid) {
                    localStorage.setItem( "Restaurantid" , data.RGroupid );
                }

                console.log( "Restaurant Group:", data );

                resetForm();

            } else {

                // ==========================================
                // BACKEND ERROR
                // ==========================================

                console.error( "Backend error:", data );

                alert( data.message || data.error || "Failed to add restaurant group" );
            }

        } catch (error) {

            console.error( "Add Restaurant Group Error:" , error );
            alert( "Unable to connect to the server. Please try again." );

        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="form-container">

            <h1 className="form-title">
                Add Restaurant Group
            </h1>


            <form onSubmit={handleSubmit}>

                {/* ======================================
                    RESTAURANT NAME
                ====================================== */}

                <div className="form-group">

                    <label
                        htmlFor="rgroupName"
                        className="form-label"
                    >
                        Restaurant Name
                    </label>

                    <input
                        id="rgroupName"
                        type="text"
                        className="form-input"
                        placeholder="Restaurant Name"
                        value={rgroupName}
                        onChange={(e) =>
                            setRGroupName(e.target.value)
                        }
                    />

                </div>

                {/* ======================================
                    AREA
                ====================================== */}

                <div className="form-group">

                    <label
                        htmlFor="area"
                        className="form-label"
                    >
                        Area
                    </label>

                    <input
                        id="area"
                        type="text"
                        className="form-input"
                        placeholder="Area"
                        value={area}
                        onChange={(e) =>
                            setArea(e.target.value)
                        }
                    />

                </div>


                {/* ======================================
                    CATEGORY
                ====================================== */}

                <div className="form-group">

                    <label className="form-label">
                        Category
                    </label>

                    <div className="option-group">

                        <label>
                            <input
                                type="checkbox"
                                value="veg"
                                checked={category.includes("veg")}
                                onChange={
                                    categoryCheckBoxHandler
                                }
                            />

                            {" "}Veg
                        </label>


                        <label>
                            <input
                                type="checkbox"
                                value="non-veg"
                                checked={category.includes("non-veg")}
                                onChange={
                                    categoryCheckBoxHandler
                                }
                            />

                            {" "}Non-Veg
                        </label>

                    </div>

                </div>


                {/* ======================================
                    REGION
                ====================================== */}

                <div className="form-group">

                    <label className="form-label">
                        Region
                    </label>

                    <div className="option-group">

                        <label>
                            <input
                                type="checkbox"
                                value="Bakery"
                                checked={region.includes("Bakery")}
                                onChange={
                                    regionCheckBoxHandler
                                }
                            />

                            {" "}Bakery
                        </label>


                        <label>
                            <input
                                type="checkbox"
                                value="Desserts"
                                checked={region.includes("Desserts")}
                                onChange={
                                    regionCheckBoxHandler
                                }
                            />

                            {" "}Desserts
                        </label>


                        <label>
                            <input
                                type="checkbox"
                                value="Indian"
                                checked={region.includes("Indian")}
                                onChange={
                                    regionCheckBoxHandler
                                }
                            />

                            {" "}Indian
                        </label>


                        <label>
                            <input
                                type="checkbox"
                                value="Italian"
                                checked={region.includes("Italian")}
                                onChange={
                                    regionCheckBoxHandler
                                }
                            />

                            {" "}Italian
                        </label>


                        <label>
                            <input
                                type="checkbox"
                                value="Chinese"
                                checked={region.includes("Chinese")}
                                onChange={
                                    regionCheckBoxHandler
                                }
                            />

                            {" "}Chinese
                        </label>

                    </div>

                </div>


                {/* ======================================
                    OFFER
                ====================================== */}

                <div className="form-group">

                    <label
                        htmlFor="offer"
                        className="form-label"
                    >
                        Offer
                    </label>

                    <input
                        id="offer"
                        type="text"
                        className="form-input"
                        placeholder="Offer"
                        value={offer}
                        onChange={(e) =>
                            setOffer(e.target.value)
                        }
                    />

                </div>


                {/* ======================================
                    IMAGE
                ====================================== */}

                <div className="form-group">

                    <label
                        htmlFor="image"
                        className="form-label"
                    >
                        Restaurant Image
                    </label>

                    <input
                        ref={fileInputRef}
                        id="image"
                        type="file"
                        className="form-file"
                        accept="image/*"
                        onChange={(e) => {

                            const selectedFile =
                                e.target.files?.[0];

                            setFile(
                                selectedFile || null
                            );

                        }}
                    />

                </div>


                {/* ======================================
                    SUBMIT
                ====================================== */}

                <div className="button-container">

                    <button
                        className="form-button"
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Uploading..."
                            : "Submit"
                        }

                    </button>

                </div>

            </form>

        </div>
    );
};


export default AddRGroup;