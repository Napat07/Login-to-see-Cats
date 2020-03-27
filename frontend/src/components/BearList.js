import React, { useEffect } from 'react';
import BearCard from './BearCard';
import './BearList.css';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'


const BearList = () => {

    const bears = useSelector(state => state.bears)
    const dispatch = useDispatch()

    const getBears = async () => {
        const result = await axios.get(`http://localhost:80/api/bears`)
        const action = { type: 'GET_BEARS', bears: result.data }
        dispatch(action)
    }

    useEffect(() => {
        getBears()
    }, [])

    if (!bears || !bears.length)
        return (<h2>No bears</h2>)
    const a =
        { b1: '5', b2: 'kuy' }
    return (
        <div className='bearlist-container'>
            {
                bears.map((bear, index) => (
                    <div key={index} style={{ margin: 5 }}>
                        <BearCard  {...bear} />
                    </div>
                ))
            }
        </div>

    )
}

export default BearList;