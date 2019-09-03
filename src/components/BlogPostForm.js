import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

const BlogPostForm = ({ onSubmit, initialValues }) => {
	const [title, setTitle] = useState(initialValues.title);
	const [content, setContent] = useState(initialValues.content);

	return (
		<View>
			<Text style={styles.labelStyle}>Enter Title:</Text>
			<TextInput
				style={styles.inputStyle}
				value={title}
				onChange={text => setTitle(text.nativeEvent.text)}
			/>
			<Text style={styles.labelStyle}>Enter Content:</Text>
			<TextInput
				style={styles.inputStyle}
				value={content}
				onChange={text => setContent(text.nativeEvent.text)}
			/>
			<Button
				title='Save Blog Post'
				onPress={() => {
					onSubmit(title, content);
				}}
			/>
		</View>
	);
};

BlogPostForm.defaultProps = {
	initialValues: {
		title: "",
		content: ""
	}
};

const styles = StyleSheet.create({
	inputStyle: {
		fontSize: 18,
		padding: 5,
		margin: 5,
		borderWidth: 1,
		borderColor: "black"
	},
	labelStyle: {
		fontSize: 20,
		marginBottom: 5,
		marginLeft: 5
	}
});

export default BlogPostForm;
