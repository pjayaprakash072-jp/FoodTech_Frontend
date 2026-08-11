import { useEffect, useState } from "react";
import { API_URI } from "../data/apiPath";

const AllProducts = () => {

    const [showProducts, setShowProducts] = useState([]);
    const [loading, setLoading] = useState(true);


    // ==========================================
    // GET PRODUCTS
    // ==========================================

    const showProductHandler = async () => {

        try {

            const rgid =
                localStorage.getItem("Restaurantid");


            if (!rgid) {

                console.log(
                    "Restaurant not found"
                );

                setShowProducts([]);

                return;
            }


            const response = await fetch(
                `${API_URI}/product/${rgid}/products`
            );


            const data = await response.json();


            if (response.ok) {

                const products =
                    data.products || [];


                console.log(
                    "Products:",
                    products
                );


                console.log(
                    "Response:",
                    data
                );


                setShowProducts(products);

            } else {

                console.error(
                    data.error ||
                    "Failed to fetch products"
                );

                setShowProducts([]);

            }

        } catch (error) {

            console.error(
                "Failed to fetch products:",
                error
            );

            setShowProducts([]);

        } finally {

            setLoading(false);

        }
    };


    // ==========================================
    // LOAD PRODUCTS
    // ==========================================

    useEffect(() => {

        showProductHandler();

    }, []);


    // ==========================================
    // DELETE PRODUCT
    // ==========================================

    const deleteProductHandler = async (id) => {

        try {

            const token =
                localStorage.getItem("loginToken");


            if (!token) {

                alert(
                    "Please login again."
                );

                return;
            }


            const confirmDelete =
                window.confirm(
                    "Are you sure you want to delete this product?"
                );


            if (!confirmDelete) {
                return;
            }


            const response = await fetch(
                `${API_URI}/product/delete/${id}`,
                {
                    method: "DELETE",

                    headers: {
                        token: token
                    }
                }
            );


            const data =
                await response.json();


            if (response.ok) {

                alert(
                    data.message ||
                    "Product deleted successfully"
                );


                // Remove deleted product
                // from the current state

                setShowProducts(
                    (previousProducts) =>
                        previousProducts.filter(
                            (product) =>
                                product._id !== id
                        )
                );


            } else {

                console.error(
                    "Delete error:",
                    data
                );


                alert(
                    data.error ||
                    data.message ||
                    "Failed to delete product"
                );

            }


        } catch (error) {

            console.error(
                "Failed to delete product:",
                error
            );


            alert(
                "Unable to connect to the server."
            );

        }
    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (
            <div>
                <h2>
                    Loading products...
                </h2>
            </div>
        );

    }


    // ==========================================
    // NO PRODUCTS
    // ==========================================

    if (showProducts.length === 0) {

        return (
            <div>
                <h1>
                    No products available
                </h1>
            </div>
        );

    }


    // ==========================================
    // PRODUCTS
    // ==========================================

    return (

        <div>

            <h1>
                All Products
            </h1>


            <table>

                <thead>

                    <tr>

                        <th>
                            Product Name
                        </th>

                        <th>
                            Price
                        </th>

                        <th>
                            Category
                        </th>

                        <th>
                            Best Seller
                        </th>

                        <th>
                            Description
                        </th>

                        <th>
                            Image
                        </th>

                        <th>
                            Delete
                        </th>

                    </tr>

                </thead>


                <tbody>

                    {showProducts.map((item) => (

                        <tr key={item._id}>

                            {/* Product Name */}

                            <td>
                                {item.productName}
                            </td>


                            {/* Price */}

                            <td>
                                ₹{item.price}
                            </td>


                            {/* Category */}

                            <td>
                                {Array.isArray(item.category)
                                    ? item.category.join(", ")
                                    : item.category}
                            </td>


                            {/* Best Seller */}

                            <td>

                                {item.bestSeller
                                    ? "Yes"
                                    : "No"}

                            </td>


                            {/* Description */}

                            <td>
                                {item.description}
                            </td>


                            {/* ==================================
                                CLOUDINARY IMAGE
                            ================================== */}

                            <td>

                                {item.image ? (

                                    <img
                                        src={item.image}
                                        width="100"
                                        height="100"
                                        alt={
                                            item.productName
                                        }
                                        style={{
                                            objectFit: "cover",
                                            borderRadius: "8px"
                                        }}
                                    />

                                ) : (

                                    <span>
                                        No image
                                    </span>

                                )}

                            </td>


                            {/* Delete */}

                            <td>

                                <button
                                    onClick={() =>
                                        deleteProductHandler(
                                            item._id
                                        )
                                    }
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );
};


export default AllProducts;