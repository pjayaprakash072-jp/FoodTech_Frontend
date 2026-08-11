import { useRef, useState } from "react";
import { API_URI } from "../../data/apiPath";

const AddProduct = () => {

    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState([]);
    const [bestSeller, setBestSeller] = useState(null);
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef(null);


    // ==========================================
    // CATEGORY CHECKBOX
    // ==========================================

    const categoryCheckboxHandler = (e) => {

        const value = e.target.value;

        if (category.includes(value)) {

            setCategory(
                category.filter((item) => item !== value)
            );

        } else {

            setCategory([
                ...category,
                value
            ]);

        }
    };


    // ==========================================
    // BEST SELLER
    // ==========================================

    const handleBestseller = (e) => {

        setBestSeller(
            e.target.value === "true"
        );

    };


    // ==========================================
    // RESET FORM
    // ==========================================

    const resetForm = () => {

        setProductName("");
        setPrice("");
        setCategory([]);
        setBestSeller(null);
        setDescription("");
        setFile(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };


    // ==========================================
    // SUBMIT
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (loading) {
            return;
        }


        // ==========================================
        // GET LOGIN TOKEN
        // ==========================================

        const token = localStorage.getItem("loginToken");


        if (!token) {

            alert(
                "Please login before adding a product."
            );

            return;
        }


        // ==========================================
        // GET RESTAURANT ID
        // ==========================================

        const restaurantid =
            localStorage.getItem("Restaurantid");


        if (!restaurantid) {

            alert(
                "Restaurant not found. Please add/select a restaurant first."
            );

            return;
        }


        // ==========================================
        // VALIDATION
        // ==========================================

        if (!productName.trim()) {

            alert("Please enter product name");

            return;
        }


        if (!price || Number(price) <= 0) {

            alert("Please enter a valid price");

            return;
        }


        if (category.length === 0) {

            alert(
                "Please select at least one category"
            );

            return;
        }


        if (bestSeller === null) {

            alert(
                "Please select whether the product is a bestseller"
            );

            return;
        }


        if (!description.trim()) {

            alert(
                "Please enter product description"
            );

            return;
        }


        if (!file) {

            alert(
                "Please select a product image"
            );

            return;
        }


        try {

            setLoading(true);


            // ==========================================
            // CREATE FORMDATA
            // ==========================================

            const fd = new FormData();


            fd.append(
                "productName",
                productName.trim()
            );


            fd.append(
                "price",
                price
            );


            // Category
            category.forEach((item) => {

                fd.append(
                    "category",
                    item
                );

            });


            fd.append(
                "bestSeller",
                bestSeller
            );


            fd.append(
                "description",
                description.trim()
            );


            // Image
            if (file) {

                fd.append(
                    "image",
                    file
                );

            }


            // ==========================================
            // SEND REQUEST
            // ==========================================

            const response = await fetch(
                `${API_URI}/product/add-product/${restaurantid}`,
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

                console.log(
                    "Product added:",
                    data
                );


                alert(
                    data.message ||
                    "Product added successfully"
                );


                resetForm();


            } else {

                // ==========================================
                // BACKEND ERROR
                // ==========================================

                console.error(
                    "Backend error:",
                    data
                );


                alert(
                    data.message ||
                    data.error ||
                    "Failed to add product"
                );

            }


        } catch (error) {

            console.error(
                "Product add error:",
                error
            );


            alert(
                "Unable to connect to the server. Please try again."
            );


        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="form-container">

            <h1 className="form-title">
                Add Product
            </h1>


            <form onSubmit={handleSubmit}>


                {/* ======================================
                    PRODUCT NAME
                ====================================== */}

                <div className="form-group">

                    <label
                        htmlFor="productName"
                        className="form-label"
                    >
                        Product Name
                    </label>


                    <input
                        id="productName"
                        type="text"
                        className="form-input"
                        placeholder="Product Name"
                        value={productName}
                        onChange={(e) =>
                            setProductName(
                                e.target.value
                            )
                        }
                    />

                </div>


                {/* ======================================
                    PRICE
                ====================================== */}

                <div className="form-group">

                    <label
                        htmlFor="price"
                        className="form-label"
                    >
                        Price
                    </label>


                    <input
                        id="price"
                        type="number"
                        min="0"
                        step="0.01"
                        className="form-input"
                        placeholder="Price"
                        value={price}
                        onChange={(e) =>
                            setPrice(
                                e.target.value
                            )
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
                                checked={
                                    category.includes(
                                        "veg"
                                    )
                                }
                                onChange={
                                    categoryCheckboxHandler
                                }
                            />

                            {" "}Veg

                        </label>


                        <label>

                            <input
                                type="checkbox"
                                value="non-veg"
                                checked={
                                    category.includes(
                                        "non-veg"
                                    )
                                }
                                onChange={
                                    categoryCheckboxHandler
                                }
                            />

                            {" "}Non-Veg

                        </label>

                    </div>

                </div>


                {/* ======================================
                    BEST SELLER
                ====================================== */}

                <div className="form-group">

                    <label className="form-label">
                        Best Seller
                    </label>


                    <div className="option-group">

                        <label>

                            <input
                                type="radio"
                                name="bestSeller"
                                value="true"
                                checked={
                                    bestSeller === true
                                }
                                onChange={
                                    handleBestseller
                                }
                            />

                            {" "}Yes

                        </label>


                        <label>

                            <input
                                type="radio"
                                name="bestSeller"
                                value="false"
                                checked={
                                    bestSeller === false
                                }
                                onChange={
                                    handleBestseller
                                }
                            />

                            {" "}No

                        </label>

                    </div>

                </div>


                {/* ======================================
                    DESCRIPTION
                ====================================== */}

                <div className="form-group">

                    <label
                        htmlFor="description"
                        className="form-label"
                    >
                        Description
                    </label>


                    <textarea
                        id="description"
                        className="form-textarea"
                        placeholder="Add description"
                        value={description}
                        onChange={(e) =>
                            setDescription(
                                e.target.value
                            )
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
                        Product Image
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


export default AddProduct;