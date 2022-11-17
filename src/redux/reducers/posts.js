import { CREATE, FETCH_ALL, UPDATE_POST } from "../constants";


export default (posts=[], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case UPDATE_POST:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        case CREATE:
            return [...posts, action.payload]
            return posts;
        default:
           return posts;
    }
}

