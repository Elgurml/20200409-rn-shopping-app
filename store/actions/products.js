import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
	return async (dispatch) => {
		// .json in tje end of URL is Firebase specific
		const response = await fetch(
			"https://rn-shopping-app-219d3.firebaseio.com/products.json"
		);

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
	};
};

export const deleteProduct = (productId) => {
	return { type: DELETE_PRODUCT, pid: productId };
};

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

export const updateProduct = (id, title, description, imageUrl) => {
	return {
		type: UPDATE_PRODUCT,
		pid: id,
		productData: {
			title,
			description,
			imageUrl,
		},
	};
};
