import React from "react";
import {
	StyleSheet,
	FlatList,
	Platform,
	Button,
	Alert,
	View,
	Text,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";
import * as productsActions from "../../store/actions/products";
import Colors from "../../constants/Colors";

const UserProductsScreen = (props) => {
	const userProducts = useSelector((state) => state.products.userProducts);
	const dispatch = useDispatch();

	const editProductHandler = (id) => {
		props.navigation.navigate("EditProduct", { productId: id });
	};

	const deleteHandler = (id) => {
		Alert.alert(
			"Are you sure you won't regret this?",
			"Do you really want to delete this items?",
			[
				{ text: "No", style: "default" },
				{
					text: "Yes",
					style: "destructive",
					onPress: () => {
						dispatch(productsActions.deleteProduct(id));
					},
				},
			]
		);
	};

	if (userProducts.length === 0) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text>No products found, maybe start creating some?</Text>
			</View>
		);
	}

	return (
		<FlatList
			data={userProducts}
			renderItem={(itemData) => (
				<ProductItem
					image={itemData.item.imageUrl}
					title={itemData.item.title}
					price={itemData.item.price}
					onSelect={() => {
						editProductHandler(itemData.item.id);
					}}
				>
					<Button
						color={Colors.primary}
						title="Edit "
						onPress={() => {
							editProductHandler(itemData.item.id);
						}}
					/>
					<Button
						color={Colors.primary}
						title="Delete"
						onPress={deleteHandler.bind(this, itemData.item.id)}
					/>
				</ProductItem>
			)}
		/>
	);
};

UserProductsScreen.navigationOptions = (navData) => {
	return {
		headerTitle: "Your Products",
		headerLeft: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Menu"
					iconName={
						Platform.OS === "android" ? "md-menu" : "ios-menu"
					}
					onPress={() => {
						navData.navigation.toggleDrawer();
					}}
				/>
			</HeaderButtons>
		),
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Add"
					iconName={
						Platform.OS === "android" ? "md-create" : "ios-create"
					}
					onPress={() => {
						navData.navigation.navigate("EditProduct");
					}}
				/>
			</HeaderButtons>
		),
	};
};

export default UserProductsScreen;

const styles = StyleSheet.create({});
