import React from 'react'
import './Admin.css'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { Route,Routes } from 'react-router-dom'
import { AddProduct } from '../../components/AddProduct/AddProduct'
import { ListProduct } from '../../components/ListProduct/ListProduct'

export const Admin = () => {
  return (
    <div className='admin'>
        <Sidebar/>
        <Routes>
            <Route path='/addproduct' element={<AddProduct/>}></Route>
            <Route path='/listproduct' element={<ListProduct/>}></Route>
        </Routes>
    </div>
  )
}
