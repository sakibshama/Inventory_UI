import { configureStore } from '@reduxjs/toolkit';
import categorySlicer from '../Slicer/CategorySlicer';
import brandsSlicer from '../Slicer/BrandSlicer';
import supplierSlicer from '../Slicer/SupplierSlicer';
import productSlicer from '../Slicer/ProductSlicer';
import billSlicer from '../Slicer/BillSlicer';
import PaymentSlice from '../Slicer/paymentTypeSlicer';
import TransectionSlicer from "../Slicer/TransactionSlicer";
import customerSlicer from "../Slicer/CustomerSlicer"
import stockSlicer from "../Slicer/StockSlicer"
import sellSlicer from "../Slicer/SellsSlicer"
import sellItems from '../Slicer/SellItemSlicer';
import investmentSlicer from "../Slicer/InvestmentSlicer"
import expenseCategorySlicer from "../Slicer/ExpenseCategorySlicer"
import expenseSlicer from "../Slicer/ExpenseSlicer"
import monthlyReportSlicer from "../Slicer/MonthlyReportSlicer"
import AllStockSlicer from "../Slicer/AllStockSlicer"
import RoleSlicer from '../Slicer/RoleSlicer'
import UserSlicer from '../Slicer/UserSlicer'
import ContainerSlicer from '../Slicer/ContainerSlicer'
import GenerateBillSlicer from '../Slicer/GenerateBillSlicer';



const store = configureStore({
  reducer: {
    allstocks:AllStockSlicer,
    category: categorySlicer,
    brands: brandsSlicer,
    supplier: supplierSlicer,
    product: productSlicer,
    bill: billSlicer,
    paymentType: PaymentSlice,
    transaction: TransectionSlicer,
    customers:customerSlicer,
    stocks: stockSlicer,
    sells: sellSlicer,
    sellItems: sellItems,
    investments: investmentSlicer,
    expenseCategorys: expenseCategorySlicer,
    expenses: expenseSlicer,
    monthlyReports: monthlyReportSlicer,
    roles:RoleSlicer,
    users:UserSlicer,
    containers:ContainerSlicer,
    generateBills: GenerateBillSlicer

   
    
  },
});

export default store;
