import React from "react";
import { StyleSheet, FlatList, Platform, Button } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";
import Colors from "../../constants/Colors"

const UserProductsScreen = () => {
	const userProducts = useSelector(state => state.products.userProducts);
	return (
		<FlatList
			data={userProducts}
			renderItem={itemData => (
				<ProductItem
					image={itemData.item.imageUrl}
					title={itemData.item.title}
					price={itemData.item.price}
					onSelect={() => {}}
				>
					<Button
						color={Colors.primary}
						title="Edit "
						onPress={() => {
							selectItemHandler(
								itemData.item.id,
								itemData.item.title
							);
						}}
					/>
					<Button
						color={Colors.primary}
						title="Delete"
						onPress={() => {
							dispatch(cartActions.addToCart(itemData.item));
						}}
					/>
				</ProductItem>
			)}
		/>
	);
};

UserProductsScreen.navigationOptions = navData => {
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
		)
	};
};

export default UserProductsScreen;

const styles = StyleSheet.create({});
