import React from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	Button,
	ScrollView
} from "react-native";
import { useSelector } from "react-redux";

const ProductDetailScreen = props => {
	const productId = props.navigation.getParam("productId");
	const selectedProduct = useSelector(state =>
		state.products.availableProducts.find(
			product => product.id === productId
		)
	);

	return (
		<View>
			<Text>{selectedProduct.title}</Text>
		</View>
	);
};

ProductDetailScreen.navigationOptions = navData => {
	return {
		headerTitle: navData.navigation.getParam("productTitle")
	};
};

export default ProductDetailScreen;

const styles = StyleSheet.create({});
