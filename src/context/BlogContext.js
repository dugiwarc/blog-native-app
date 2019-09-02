import React, { useState, useReducer } from "react";

const BlogContext = React.createContext();

const blogReducer = (state, action) => {
	switch (action.type) {
		case "ADD_BLOGPOST":
			return [...state, { title: `Blog Post #${state.length + 1}` }];
		default:
			return state;
	}
};

export const BlogProvider = ({ children }) => {
	// const [blogPosts, setBlogPosts] = useState([]);
	const [blogPosts, dispatch] = useReducer(blogReducer, []);

	const addBlogPost = () => {
		dispatch({ type: "ADD_BLOGPOST" });
	};
	// const addBlogPost = () => {
	// 	setBlogPosts([
	// 		...blogPosts,
	// 		{ title: `Blog Post #${blogPosts.length + 1}` }
	// 	]);
	// };

	return (
		<BlogContext.Provider value={{ data: blogPosts, addBlogPost }}>
			{children}
		</BlogContext.Provider>
	);
};

export default BlogContext;
