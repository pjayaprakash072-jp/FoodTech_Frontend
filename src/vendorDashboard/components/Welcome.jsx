import { useEffect, useState } from "react";
import { API_URI } from "../data/apiPath";

const Welcome = () => {

    const vendorname =
        localStorage.getItem("vendorname");

    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRestaurant, setSelectedRestaurant] =
        useState(
            localStorage.getItem("Restaurantid")
        );


    // ==========================================
    // GET VENDOR RESTAURANTS
    // ==========================================

    const getRestaurants = async () => {

        try {

            const token =
                localStorage.getItem("loginToken");


            if (!token) {

                console.log(
                    "Vendor is not logged in"
                );

                return;
            }


            const response = await fetch(
                `${API_URI}/vendor/restaurants`,
                {
                    method: "GET",

                    headers: {
                        token: token
                    }
                }
            );


            const data =
                await response.json();


            if (response.ok) {

                console.log(
                    "Vendor restaurants:",
                    data
                );


                setRestaurants(
                    data.restaurants || []
                );

            } else {

                console.error(
                    data.error ||
                    "Failed to fetch restaurants"
                );

            }

        } catch (error) {

            console.error(
                "Restaurant fetch error:",
                error
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        getRestaurants();

    }, []);


    // ==========================================
    // SELECT RESTAURANT
    // ==========================================

    const selectRestaurant = (restaurantId) => {

        localStorage.setItem(
            "Restaurantid",
            restaurantId
        );


        setSelectedRestaurant(
            restaurantId
        );


        alert(
            "Restaurant selected successfully"
        );
    };


    return (

        <div className="welcome-container">

            <h1>
                Welcome {vendorname}!
            </h1>


            <h2>
                Your Restaurants
            </h2>


            {loading ? (

                <p>
                    Loading restaurants...
                </p>

            ) : restaurants.length === 0 ? (

                <p>
                    You don't have any restaurants yet.
                </p>

            ) : (

                <div className="restaurant-list">

                    {restaurants.map((restaurant) => (

                        <div
                            key={restaurant._id}
                            className={
                                selectedRestaurant === restaurant._id
                                    ? "restaurant-card selected"
                                    : "restaurant-card"
                            }
                            onClick={() =>
                                selectRestaurant(
                                    restaurant._id
                                )
                            }
                        >

                            {/* Restaurant Image */}

                            {restaurant.image ? (

                                <img
                                    src={restaurant.image}
                                    alt={
                                        restaurant.RGroupName
                                    } width="200" height="200"
                                    className="restaurant-image"
                                />

                            ) : (

                                <div className="no-image">
                                    No Image
                                </div>

                            )}


                            {/* Restaurant Information */}

                            <div className="restaurant-info">

                                <h3>
                                    {restaurant.RGroupName}
                                </h3>


                                <p>
                                    Area: {restaurant.area}
                                </p>


                                <p>
                                    Category:{" "}
                                    {Array.isArray(
                                        restaurant.category
                                    )
                                        ? restaurant.category.join(
                                            ", "
                                        )
                                        : restaurant.category}
                                </p>


                                <p>
                                    Region:{" "}
                                    {Array.isArray(
                                        restaurant.region
                                    )
                                        ? restaurant.region.join(
                                            ", "
                                        )
                                        : restaurant.region}
                                </p>


                                {selectedRestaurant ===
                                    restaurant._id && (

                                    <strong>
                                        ✓ Selected
                                    </strong>

                                )}

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );
};


export default Welcome;