import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct, setProductIdz } from "../../Slicer/ProductSlicer";
import UpdateProduct from "./UpdateProduct";
import CreateProduct from "./CreateProduct";

const Product = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const isChanged = useSelector((state) => state.product.isChanged);
  // const category = useSelector((state) => state.category);
  // const brand = useSelector((state) => state.brands)

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, isChanged]);

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleInfo = (id)=>{
    dispatch(setProductIdz(id));
  }

  const columnNames = [
    { id: 1, val: "ID" },
    { id: 2, val: "PRODUCT NAME" },
    { id: 3, val: "DESCRIPTION" },
    { id: 4, val: "CATEGORY" },
    { id: 6, val: "BRAND" },
    { id: 7, val: "Quantity" },
    { id: 8, val: "Action" },
  ];

  return (
    <div>
      <h3>Product</h3>
      <div className="option-box row">
        <div className="mb-3 col-md-12">
          <CreateProduct />
        </div>
      </div>

      <div className="tables">
        <div className="card">
          <h5 className="card-header">Products List</h5>
          <div className="table-responsive text-nowrap">
            <table className="table">
              <thead>
                <tr className="text-nowrap">
                  {columnNames.map((value) => (
                    <th key={value.id} className="text-nowrap">
                      {value.val}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {Array.isArray(products) &&
                  products.map((val) => {

                    return (
                      <tr key={val.id}>
                        <td className="text-nowrap">{val.id}</td>
                        <td className="text-nowrap">{val.name}</td>
                        <td className="text-nowrap">{val.description}</td>
                        <td className="text-nowrap">
                          {val.category.name}
                        </td>
                        <td className="text-nowrap">
                          {val.brand.name}
                        </td>
                        <td className="text-nowrap">
                          {val.quantity}
                        </td>

                        {/* <td className="text-nowrap">{val.category_id}</td>
                      <td className="text-nowrap">{val.brand_id}</td> */}

                        <td className="text-nowrap d-flex align-items-center gap-2">


                          <button
                            type="button"
                            className="btn btn-success"
                            data-bs-toggle="modal"
                            data-bs-target="#updateProductModal"
                            onClick={()=>{handleInfo(val.id)}}
                          >
                            Update
                          </button>
                          <UpdateProduct />





                          <button
                            onClick={() => handleDeleteProduct(val.id)}
                            className="btn btn-danger btn-sm"
                          >
                            <i className="bx bxs-trash"></i>
                          </button>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
