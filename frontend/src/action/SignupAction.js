
// // Action creator with Redux Thunk
// export const signup = (data) => async (dispatch) => {
//     try {
//         // Make an API request to your signup endpoint
//         const res = await fetch('https://api.cloudinary.com/v1_1/dbobv7ulv/image/upload', {
//             method: 'post',
//             body: data,
//         });

//         const urlData = await res.json();

//         // Dispatch a success action with the user data
//         dispatch({
//             type: 'SIGNUP_SUCCESS',
//             payload: urlData,
//         });
//     } catch (error) {
//         // Dispatch an error action if the API request fails
//         dispatch({
//             type: 'SIGNUP_FAILURE',
//             payload: error.message, // You can customize the payload to include error details
//         });
//     }
// };
// Action creator with Redux Thunk
export const signup = (data) => async (dispatch) => {
    try {
        // Make an API request to your signup endpoint
        const res = await fetch('https://api.cloudinary.com/v1_1/dbobv7ulv/image/upload', {
            method: 'post',
            body: data,
        });

        const urlData = await res.json();

        // Dispatch a success action with the user data
        dispatch({
            type: 'SIGNUP_SUCCESS',
            payload: { url: urlData.url }, // Ensure you have an object with a 'url' property
        });

        return { payload: { url: urlData.url } }; // Return the action object for further processing
    } catch (error) {
        // Dispatch an error action if the API request fails
        dispatch({
            type: 'SIGNUP_FAILURE',
            payload: error.message, // You can customize the payload to include error details
        });

        throw error; // Rethrow the error for error handling in your component
    }
};
