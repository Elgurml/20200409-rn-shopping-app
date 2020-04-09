// AsyncStorage is an API that uses a key value storage on the device with data that persists on app relaunch
import { AsyncStorage } from "react-native";

// export const SIGNUP = "SIGNUP";
// export const LOGIN = "LOGIN";
export const AUTHENTICATE = "AUTHENTICATE"

export const authenticate = (userId, token) => {
	return { type: AUTHENTICATE, userId: userId, token: token }
}

export const signup = (email, password) => {
	return async (dispatch) => {
		const response = await fetch(
			"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBVO8mi-JXkYinAPQIXgmLjk6VX0lrCTow",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
					password: password,
					returnSecureToken: true,
				}),
			}
		);

		if (!response.ok) {
			const errorResData = await response.json();
			const errorId = errorResData.error.message;
			let message = "Something went wrong!";
			if (errorId === "EMAIL_EXISTS") {
				message = "This email already exists!";
			}
			throw new Error(message);
		}

		const resData = await response.json();
		console.log("signup--------", resData);
		dispatch(authenticate(resData.localId, resData.idToken));
		// getTime in ms and resData.expiresIn in sec so => * 1000
		const expirationDate = new Date(
			new Date().getTime() + parseInt(resData.expiresIn) * 1000
		);
		saveDataToStorage(resData.idToken, resData.localId);
	};
};

export const login = (email, password) => {
	return async (dispatch) => {
		const response = await fetch(
			"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBVO8mi-JXkYinAPQIXgmLjk6VX0lrCTow",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
					password: password,
					returnSecureToken: true,
				}),
			}
		);

		if (!response.ok) {
			const errorResData = await response.json();
			const errorId = errorResData.error.message;
			let message = "Something went wrong!";
			if (errorId === "EMAIL_NOT_FOUND") {
				message = "This email could not be found!";
			} else if (errorId === "INVALID_PASSWORD") {
				message = "This password is not valid!";
			}
			throw new Error(message);
		}

		const resData = await response.json();
		console.log("login--------", resData);
		dispatch(authenticate(resData.localId, resData.idToken));
		// getTime in ms and resData.expiresIn in sec so => * 1000
		const expirationDate = new Date(
			new Date().getTime() + parseInt(resData.expiresIn) * 1000
		);
		saveDataToStorage(resData.idToken, resData.localId, expirationDate);
	};
};

const saveDataToStorage = (token, userId, expirationDate) => {
	AsyncStorage.setItem(
		"userData",
		JSON.stringify({
			token: token,
			userId: userId,
			expiryDate: expirationDate.toISOString(),
		})
	);
};
