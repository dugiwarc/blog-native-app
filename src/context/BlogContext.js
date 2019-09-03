// import React, { useState, useReducer } from "react";
import createDataContext from "./CreateDataContext";
import jsonServer from "../api/jsonServer";
// const BlogContext = React.createContext();

const blogReducer = (state, action) => {
	switch (action.type) {
		// case "ADD_BLOGPOST":
		// 	return [
		// 		...state,
		// 		{
		// 			id: Math.floor(Math.random() * 9999),
		// 			title: action.payload.title,
		// 			content: action.payload.content
		// 		}
		// 	];
		case "DELETE_BLOGPOST":
			return state.filter(item => item.id !== action.payload);
		case "EDIT_BLOGPOST":
			return state.map(item =>
				item.id === action.payload.id ? action.payload : item
			);

		case "GET_BLOGPOSTS":
			return action.payload;
		default:
			return state;
	}
};

const getBlogPosts = dispatch => {
	return async () => {
		const response = await jsonServer.get("/blogposts");

		dispatch({ type: "GET_BLOGPOSTS", payload: response.data });
	};
};

const addBlogPost = dispatch => {
	return async (title, content, callback) => {
		await jsonServer.post("/blogposts", { title, content });
		console.log("DASDA");
		callback && callback();
	};
	// return (title, content, callback) => {
	// 	dispatch({ type: "ADD_BLOGPOST", payload: { title, content } });
	// 	callback && callback();
	// };
};

const deleteBlogPost = dispatch => {
	return async id => {
		await jsonServer.delete(`/blogposts/${id}`);
		dispatch({ type: "DELETE_BLOGPOST", payload: id });
	};
};

const editBlogPost = dispatch => {
	return async (id, title, content, callback) => {
		await jsonServer.put(`/blogposts/${id}`, { title, content });
		dispatch({ type: "EDIT_BLOGPOST", payload: { id, title, content } });
		callback && callback();
	};
};

export const { Context, Provider } = createDataContext(
	blogReducer,
	{ addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
	[]
);

// export const BlogProvider = ({ children }) => {
// 	// const [blogPosts, setBlogPosts] = useState([]);
// 	const [blogPosts, dispatch] = useReducer(blogReducer, []);

// 	// const addBlogPost = () => {
// 	// 	setBlogPosts([
// 	// 		...blogPosts,
// 	// 		{ title: `Blog Post #${blogPosts.length + 1}` }
// 	// 	]);
// 	// };

// 	return (
// 		<BlogContext.Provider value={{ data: blogPosts, addBlogPost }}>
// 			{children}
// 		</BlogContext.Provider>
// 	);
// };

// export default BlogContext;
