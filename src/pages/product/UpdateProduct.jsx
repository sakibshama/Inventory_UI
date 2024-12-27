import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct, fetchProductById } from "../../Slicer/ProductSlicer";
import ReactQuill from "react-quill"; // Import React Quill
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import {fetchCategory} from './../../Slicer/CategorySlicer'
import {fetchBrands} from './../../Slicer/BrandSlicer'

const UpdateProducts = () => {
  const dispatch = useDispatch();
  const setProductId = useSelector((state) => state.product.setProductId);

  const Category = useSelector((state)=> state.category.Category);
  const brnads = useSelector((state)=> state.brands.brands);

  useEffect(()=>{
    dispatch(fetchCategory());
    dispatch(fetchBrands());
  },[])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Fetch product data and set form values
  useEffect(() => {
    dispatch(fetchProductById(setProductId)).then((res) => {
      const { name, description, category_id, brand_id, quantity } = res.payload;
      setValue("name", name);
      setValue("description", description);
      setValue("category_id", category_id);
      setValue("brand_id", brand_id);
      setValue("quantity", quantity);
    });
  }, [dispatch, setProductId, setValue]);

  // Form submit handler
  const onSubmit = (data) => {


    dispatch(updateProduct({ id: setProductId, updatedData: data }));
  };

  return (
    <div>
      

      <div
        className="modal fade"
        id="updateProductModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="updateProductLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="updateProductLabel">
                Update Product
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="productNameUpdate" className="form-label">
                    Product Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="productNameUpdate"
                    placeholder="E.g. Asus"
                    {...register("name", {
                      required: "Product name is required",
                    })}
                  />
                  {errors.name && (
                    <p className="text-danger">{errors.name.message}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="productDiscriptionUpdate"
                    className="form-label"
                  >
                    Product Description
                  </label>
                  <input
                    className="form-control"
                    {...register("description", {
                      required: "Description is required",
                    })}
                    onChange={(e) => setValue("description", e.target.value)}
                  />
                  {errors.description && (
                    <p className="text-danger">
                      {errors.description.message}
                    </p>
                  )}
                </div>


                <div className="mb-3">
                  <label
                    htmlFor="productDiscriptionUpdate"
                    className="form-label"
                  >
                    Product Quantity
                  </label>
                  <input
                    className="form-control"
                    {...register("quantity", {
                      required: "Quantity is required",
                    })}
                    onChange={(e) => setValue("quantity", e.target.value)}
                  />
                  {errors.quantity && (
                    <p className="text-danger">
                      {errors.quantity.message}
                    </p>
                  )}
                </div>



                <div className="mb-3">
                <label htmlFor="productNameInput" className="form-label">
                  Category
                </label>
                
                <select  className="form-select" 
                {...register("category_id", {
                  required: "id is required",
                })}
                onChange={(e)=>{setValue("category_id",e.target.value)}}>
                  <option value="">Select Category</option>
                  {
                    Category.map((category, index) => (
                      <option key={index} value={category.id}>{category.name}</option>
                      ))
                      
                  }
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="productNameInput" className="form-label">
                  Brand
                </label>
                
                <select  className="form-select" 
                
                {...register("brand_id", {
                  required: "id is required",
                })}
                
                onChange={(e)=>{setValue("brand_id",e.target.value)}}>
                  <option value="">Select Brand</option>
                  {
                    brnads.map((brand, index) => (
                      <option key={index} value={brand.id}>{brand.name}</option>
                      ))
                      
                  }
                </select>
              </div>


                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProducts;
