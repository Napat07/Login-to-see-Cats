import React from 'react';
import './BearCard.css';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { deleteBear, updateBear } from '../redux/action'
import { bindActionCreators } from 'redux'
import 'bootstrap/dist/css/bootstrap.min.css'


const BearCard = props => {
    const dispatch = useDispatch()
    const form = useSelector(state => state.form)

    const obj = bindActionCreators({
        deleteBear: deleteBear,
        updateBear: updateBear
    }, useDispatch())


    return (
        <div className='bearcard-container'>
            <div className='bearcard' style={{ backgroundImage: `url('${props.img}')` }}>
                <p className='bearcard-weight'>{props.weight}</p>
                <p className='bearcard-name'>{props.name}</p>
            </div>
            <div className='bearcard-actions'>
                <div type="button" class="btn btn-warning" onClick={() => { obj.updateBear(props.id, form) }}>Update</div>
                <div type="button" class="btn btn-danger" onClick={() => { obj.deleteBear(props.id) }}>Delete</div>
            </div>
        </div>

    )
}

export default BearCard;