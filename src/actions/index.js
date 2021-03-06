import jsonPlaceholder from '../apis/jsonPlaceholder'
import _ from 'lodash'

export const selectPttPost = pttPost => {
    console.log("selectPttPost", pttPost)
    return {
        type: "PTT_POST_SELECTED",
        payload: pttPost
    };
};

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch (fetchPosts());
    const userIds = _.uniq(_.map(getState().fetchPosts, 'userId'))
    userIds.forEach(id => dispatch(fetchUser(id)))
}

export const fetchUser = (userId) => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${userId}`)

    dispatch({type:'FETCH_USER', payload: response.data})
}

// shorten version
export const fetchPosts = () => async dispatch => {
    const response = await jsonPlaceholder.get('/posts')

    dispatch({type:'FETCH_POSTS', payload: response.data})
}

// origin version
// export const fetchPosts = () => {
//     // dispatch: can change any data we want
//     // getState: get or access any data we want
//     return async function(dispatch, getState) {
//         const response = await jsonPlaceholder.get('/posts')
//
//         dispatch({type:'FETCH_POSTS', payload: response})
//     }
// }
