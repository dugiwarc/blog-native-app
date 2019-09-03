import React, { useContext, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	Button,
	TouchableOpacity
} from "react-native";
import { Context } from "../context/BlogContext";
import { Feather } from "@expo/vector-icons";

const IndexScreen = ({ navigation }) => {
	const { state, addBlogPost, deleteBlogPost, getBlogPosts } = useContext(
		Context
	);

	useEffect(() => {
		getBlogPosts();
		// everytime you get to this page do this
		const listener = navigation.addListener("didFocus", () => {
			getBlogPosts();
		});
		return () => {
			listener.remove();
		};
	}, []);
	return (
		<View>
			<Text>Index Screen</Text>
			<FlatList
				data={state}
				keyExtractor={item => item.title}
				renderItem={({ item }) => {
					return (
						<TouchableOpacity
							onPress={() => {
								console.log("Tap");
								navigation.navigate("Show", { id: item.id });
							}}
						>
							<View style={styles.viewStyle}>
								<Text style={styles.textStyle}>
									{item.title} - {item.id}
								</Text>
								<TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
									<Feather style={styles.featherStyle} name='trash' />
								</TouchableOpacity>
							</View>
						</TouchableOpacity>
					);
				}}
			/>
		</View>
	);
};

IndexScreen.navigationOptions = ({ navigation }) => {
	return {
		headerRight: (
			<TouchableOpacity onPress={() => navigation.navigate("Create")}>
				<Feather name='plus' size={30} />
			</TouchableOpacity>
		)
	};
};

const styles = StyleSheet.create({
	featherStyle: {
		fontSize: 24
	},
	textStyle: {
		fontSize: 18
	},
	viewStyle: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 10,
		paddingVertical: 20,
		borderTopWidth: 1,
		borderColor: "gray"
	}
});

export default IndexScreen;
