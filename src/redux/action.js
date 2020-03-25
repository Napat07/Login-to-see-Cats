import axios from 'axios'

export const Change = (key, value) => {
    return {
        type: 'CHANGE',
        key: key,
        value: value
    }
}

export const AddBear = (form) => async (dispatch) => {
    console.log(form)
    const result = await axios.post(`http://localhost:80/api/bears/`, form)
    dispatch({
        type: 'ADD_BEARS',
        bear: {
            ...form
        }
    })
    dispatch({
        type: 'INITIAL'
    })
}

export const deleteBear = (id) => async (dispatch) => {

    const result = await axios.delete(`http://localhost:80/api/bears/${id}`)
    dispatch({
        type: 'DELETE_BEARS',
        id: id
    })

}
export const updateBear = (id, form) => async (dispatch) => {

    const result = await axios.put(`http://localhost:80/api/bears/${id}`, form)
    dispatch({
        type: 'UPDATE_BEARS',
        id: id,
        bear: { ...form, id: id }
    })

}
