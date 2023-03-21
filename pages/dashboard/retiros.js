import DashboardLayout from '../../components/layouts/DashboardLayout'
import Products from '../../components/products/Products'
import Withdrawals from '../../components/withdrawals/Withdrawals'

const productos = () => {
  return (
    <DashboardLayout section={"Retiros"}>
      <Withdrawals/>
    </DashboardLayout>
  )
}

export default productos