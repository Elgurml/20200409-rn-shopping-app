import React from "react";
import { View, StyleSheet } from "react-native";

const Card = props => {
	return <View style={{...styles.card, ...props.style}}>{props.children}</View>;
};

export default Card;

const styles = StyleSheet.create({
	card: {
		shadowColor: "black",
		shadowOpacity: 0.6,
		shadowOffset: { width: 0, height: 20 },
		shadowRadius: 8,
		elevation: 5,
		borderRadius: 10,
		backgroundColor: "white"
	}
});
