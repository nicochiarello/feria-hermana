import React from 'react'
import Categories from '../../components/categories/Categories'
import DashboardLayout from '../../components/layouts/DashboardLayout'

const categorias = () => {
  return (
    <DashboardLayout section={"Categorias"}>
      <Categories/>
    </DashboardLayout>
  )
}

export default categorias