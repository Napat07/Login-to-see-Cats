import React from 'react';
import './InputForm.css';
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import axios from 'axios'
import { Change, AddBear } from '../redux/action'


const InputForm = props => {

    const dispatch = useDispatch()
    const form = useSelector(state => state.form)
    const bears = useSelector(state => state.bears)

    const obj = bindActionCreators({

        Change: Change,
        AddBear: AddBear
    }, useDispatch())


    const { data, onChange } = props;
    return (
        <div className='form-container'>
            <h2>Add bear</h2>
            <table>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>
                            <input className='inpt' type="text" value={form.name} onChange={(e) => obj.Change('name', e.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <td>Weight</td>
                        <td>
                            <input className='inpt' type="number" value={form.weight} onChange={(e) => obj.Change('weight', e.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <td>Image</td>
                        <td>
                            <input className='inpt' type="text" value={form.img} onChange={(e) => obj.Change('img', e.target.value)} /> <br />
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>


                            <button className='btn' onClick={() => {
                                console.log('test')
                                obj.AddBear(form)
                            }

                            }>CREATE</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div >
    )
}

export default InputForm