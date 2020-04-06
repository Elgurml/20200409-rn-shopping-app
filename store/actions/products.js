import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

////////// Get the data from Firebase //////////
export const fetchProducts = () => {
	return async (dispatch) => {
		// .json in tje end of URL is Firebase specific
		try {
			const response = await fetch(
				"https://rn-shopping-app-219d3.firebaseio.com/products.json"
			);

			if (!response.ok) {
				throw new Error("Something went wrong!");
			}

			const resData = await response.json();
			const loadedProduct = [];

			for (const key in resData) {
				loadedProduct.push(
					new Product(
						key,
						"u1",
						resData[key].title,
						resData[key].imageUrl,
						resData[key].description,
						resData[key].price
					)
				);
			}

			dispatch({ type: SET_PRODUCTS, products: loadedProduct });
		} catch (err) {
			// send to custom analytics server
			throw err;
		}
	};
};

////////// Delete a Product //////////
export const deleteProduct = (productId) => {
	return async (dispatch) => {
		const response = await fetch(
			`https://rn-shopping-app-219d3.firebaseio.com/products/${productId}.json`,
			{
				method: "DELETE",
			}
		);

		if (!response.ok) {
			throw new Error("Something went wrong!"); 
		}

		dispatch({ type: DELETE_PRODUCT, pid: productId });
	};
};

////////// Create a Product //////////
export const createProduct = (title, description, imageUrl, price) => {
	// we add this next return around the other for reduxThunk. then we change the other return to dispatch()
	return async (dispatch) => {
		const response = await fetch(
			"https://rn-shopping-app-219d3.firebaseio.com/products.json",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title,
					description,
					imageUrl,
					price,
				}),
			}
		);

		const resData = await response.json();

		dispatch({
			type: CREATE_PRODUCT,
			// productData: {
			// 	title: title,
			// 	imageUrl: imageUrl,
			// 	price: price,
			// 	description: description
			// }      or the JS shorcut under
			productData: {
				id: resData.name,
				title,
				description,
				imageUrl,
				price,
			},
		});
	};
};

////////// Update a Product //////////
export const updateProduct = (id, title, description, imageUrl) => {
	return async (dispatch) => {
		const response = await fetch(
			`https://rn-shopping-app-219d3.firebaseio.com/products/${id}.json`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title,
					description,
					imageUrl,
				}),
			}
		);

		if (!response.ok) {
			throw new Error("Something went wrong!"); 
		}

		dispatch({
			type: UPDATE_PRODUCT,
			pid: id,
			productData: {
				title,
				description,
				imageUrl,
			},
		});
	};
};
