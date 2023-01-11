import React from 'react'
import DashboardLayout from '../components/layouts/DashboardLayout'
import Products from '../components/products/Products'

const productos = () => {
  return (
    <DashboardLayout section={"Productos"}>
      <Products/>
    </DashboardLayout>
  )
}

export default productos