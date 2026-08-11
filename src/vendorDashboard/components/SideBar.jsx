const SideBar = ({
    showAddProductHandler,
    showAddRGroupHandler,
    showAllProductsHandler
}) => {


    // ==========================================
    // LOGOUT
    // ==========================================

    const logoutHandler = (e) => {

        e.preventDefault();

        localStorage.clear();

        window.location.reload();
    };


    // ==========================================
    // CHECK SELECTED RESTAURANT
    // ==========================================

    const checkRestaurant = (handler) => {

        const restaurantId =
            localStorage.getItem("Restaurantid");


        if (!restaurantId) {

            alert(
                "Please select a restaurant first."
            );

            return;
        }


        handler();
    };


    return (

        <div className="sidebar-dev">

            <ul className="sidebar-ul">


                {/* ======================================
                    ADD RESTAURANT
                ====================================== */}

                <li
                    onClick={showAddRGroupHandler}
                    className="loginbtn"
                >
                    Add Restaurant
                </li>


                {/* ======================================
                    ADD PRODUCT
                ====================================== */}

                <li
                    onClick={() =>
                        checkRestaurant(
                            showAddProductHandler
                        )
                    }
                    className="loginbtn"
                >
                    Add Product
                </li>


                {/* ======================================
                    ALL PRODUCTS
                ====================================== */}

                <li
                    onClick={() =>
                        checkRestaurant(
                            showAllProductsHandler
                        )
                    }
                    className="loginbtn"
                >
                    All Products
                </li>


                {/* ======================================
                    USER
                ====================================== */}

                <li>
                    User
                </li>


                {/* ======================================
                    LOGOUT
                ====================================== */}

                <li
                    onClick={logoutHandler}
                    className="loginbtn"
                >
                    Logout
                </li>

            </ul>

        </div>

    );
};


export default SideBar;