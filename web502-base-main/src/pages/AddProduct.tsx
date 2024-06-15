import { Product } from "@/interfaces/Product";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import React from "react";
import { useForm } from "react-hook-form";
type Props = {
  onSubmit: (product: Product) => void;
};
const productSchema = Joi.object({
  title: Joi.string().required().min(6).max(100),
  description: Joi.string().required(),
  price: Joi.number().required().min(0),
});

const AddProduct = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>({
    resolver: joiResolver(productSchema),
  });
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>AddProduct</h1>
        <div className="form-group">
          <label htmlFor="">Title</label>
          <input
            type="text"
            className="form-control"
            {...register("title", {
              required: true,
              minLength: 6,
              maxLength: 100,
            })}
          />
          {errors.title && (
            <div className="text-danger">{errors.title.message}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="">price</label>
          <input
            type="number"
            className="form-control"
            {...register("price", { required: true, min: 0 })}
          />
          {errors.price && (
            <div className="text-danger">{errors.price.message}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="">description</label>
          <input
            type="text"
            className="form-control"
            {...register("description", { required: true })}
          />
          {errors.description && (
            <div className="text-danger">{errors.description.message}</div>
          )}
        </div>
        <button className="btn btn-primary ">Submit</button>
      </form>
    </div>
  );
};

export default AddProduct;
