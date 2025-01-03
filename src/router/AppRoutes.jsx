import { Route, Routes } from "react-router-dom";
// Layout

import { DashboardPage } from "../pages/DashboardPage";
import Categorys from "../pages/category/Category";
import UpdateCategorys from "../pages/category/UpdateCategory";
import CreateCategorys from "../pages/category/CreateCategory";

import Brand from "../pages/brands/Brands";
import UpdateBrand from "../pages/brands/UpdateBrands";
import CreateBrand from "../pages/brands/CreateBrands";


import Supplier from "../pages/Supplier/Supplier";
import UpdateSupplier from "../pages/Supplier/UpdateSupplier";
import CreateSupplier from "../pages/Supplier/CreateSupplier";


import Product from "../pages/product/Product";
import UpdateProduct from "../pages/product/UpdateProduct";
import CreateProduct from "../pages/product/CreateProduct";


import Bill from "../pages/bill/Bill";
import CreateBill from "../pages/bill/CreateBill";
import GenerateBill from "../pages/bill/GenerateBill";


import PaymentType from "../pages/paymantType/PaymentType";
import CreatePaymentType from "../pages/paymantType/createPaymentType";


import Transaction from "../pages/transaction/Transaction";
import CreateTransation from "../pages/transaction/CreateTransection"


import Customers from "../pages/Customer/Customers";
import CreateCustomer from "../pages/Customer/CreateCustomer";
import UpdateCustomer from "../pages/Customer/UpdateCustomer";

import Stocks from "../pages/Stock/Stocks";
import CreateStock from "../pages/Stock/CreateStock";
import UpdateStock from "../pages/Stock/UpdateStock";

import AllStocks from "../pages/AllStock/AllStocks";
import CreateAllStock from "../pages/AllStock/CreateAllStock";
import UpdateAllStock from "../pages/AllStock/UpdateAllStock";

import Sells from "../pages/Sells/Sells";
import CreateSell from "../pages/Sells/CreateSell";
import UpdateSell from "../pages/Sells/UpdateSell";

import SellItems from "../pages/SellItem/SellItems";
import CreateSellItem from "../pages/SellItem/CreateSellItem";
import UpdateSellItem from "../pages/SellItem/UpdateSellItem";

import Investments from "../pages/Investment/Investments";
import CreateInvestment from "../pages/Investment/CreateInvestment";
import UpdateInvestment from "../pages/Investment/UpdateInvestment";

import ExpenseCategory from "../pages/ExpenseCategory/ExpenseCategorys";
import CreateExpenseCategory from "../pages/ExpenseCategory/CreateExpenseCategory";
import UpdateExpenseCategory from "../pages/ExpenseCategory/UpdateExpenseCategory";

import Expense from "../pages/Expense/Expense";
import CreateExpense from "../pages/Expense/CreateExpense";
import UpdateExpense from "../pages/Expense/UpdateExpense";

import MonthlyReport from "../pages/monthlyReport/monthlyReport";

import Role from "../pages/role/Role";
import CreateRole from "../pages/role/CreateRole";
import UpdateRole from "../pages/role/UpdateRole";

import User from "../pages/user/User";
import CreateUser from "../pages/user/CreateUser";
import UpdateUser from "../pages/user/UpdateUser";
import Container from "../pages/Container/Container";
import CreateContainer from "../pages/Container/CreateContainer";
import UpdateContainer from "../pages/Container/UpdateContainer";



import BillPdf from '../pages/bill/BillPdf'


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/category" element={<Categorys />} />
      <Route path="/category/update/:id" element={<UpdateCategorys />} />
      <Route path="/category/create" element={<CreateCategorys />} />

      <Route path="/brand" element={<Brand />} />
      <Route path="/brand/update/:id" element={<UpdateBrand />} />
      <Route path="/brand/create" element={<CreateBrand />} />

      <Route path="/supplier" element={<Supplier />} />
      <Route path="/supplier/update/:id" element={<UpdateSupplier />} />
      <Route path="/supplier/create" element={<CreateSupplier />} />

      <Route path="/product" element={<Product />} />
      <Route path="/product/update/:id" element={<UpdateProduct />} />
      <Route path="/product/create" element={<CreateProduct />} />

      <Route path="/bill" element={<Bill />} />
      <Route path="/bill/create" element={<CreateBill />} />
      <Route path="/bill/generate" element={<GenerateBill />} />
      <Route path="/bill/download/pdf" element={<BillPdf/>}/>

      <Route path="/paymentType" element={<PaymentType />} />
      <Route path="/paymentType/create" element={<CreatePaymentType />} />

      <Route path="/transaction" element={<Transaction />} />
      <Route path="/transaction/create" element={<CreateTransation />} />

      <Route path="/customers" element={<Customers />} />
      <Route path="/customers/create" element={<CreateCustomer />} />
      <Route path="/customers/update/:id" element={<UpdateCustomer />} />

      <Route path="/container" element={<Container />} />
      <Route path="/container/create" element={<CreateContainer />} />
      <Route path="/container/update/:id" element={<UpdateContainer />} />

      <Route path="/stock" element={<Stocks />} />
      <Route path="/stocks/create" element={<CreateStock />} />
      <Route path="/stocks/update/:id" element={<UpdateStock />} />


      <Route path="/all_stocks" element={<AllStocks />} />
      <Route path="/all_stocks/create" element={<CreateAllStock />} />
      <Route path="/all_stocks/update/:id" element={<UpdateAllStock />} />

      <Route path="/sells" element={<Sells />} />
      <Route path="/sells/create" element={<CreateSell />} />
      <Route path="/sells/update/:id" element={<UpdateSell />} />

      <Route path="/user" element={<User />} />
      <Route path="/user/create" element={<CreateUser />} />
      <Route path="/user/update/:id" element={<UpdateUser />} />

      <Route path="/role" element={<Role />} />
      <Route path="/role/create" element={<CreateRole />} />
      <Route path="/role/update/:id" element={<UpdateRole />} />

      <Route path="/sellItem" element={<SellItems />} />
      <Route path="/sellItem/create" element={<CreateSellItem />} />
      <Route path="/sellItem/update/:id" element={<UpdateSellItem />} />

      <Route path="/investment" element={<Investments />} />
      <Route path="/investment/create" element={<CreateInvestment />} />
      <Route path="/investment/update/:id" element={<UpdateInvestment />} />

      <Route path="/expenseCategory" element={<ExpenseCategory />} />
      <Route
        path="/expenseCategory/create"
        element={<CreateExpenseCategory />}
      />
      <Route
        path="/expenseCategory/update/:id"
        element={<UpdateExpenseCategory />}
      />

      <Route path="/expense" element={<Expense />} />
      <Route path="/expense/create" element={<CreateExpense />} />
      <Route path="/expense/update/:id" element={<UpdateExpense />} />

      <Route path="/monthlyReport" element={<MonthlyReport />} />


    </Routes>
  );
}
export default AppRoutes;