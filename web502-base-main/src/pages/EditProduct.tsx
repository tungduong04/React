import { Product } from "@/interfaces/Product";
import instance from "@/services";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
type Props = {
  onSubmit: (product: Product) => void;
};
const productSchema = Joi.object({
  title: Joi.string().required().min(6).max(100),
  description: Joi.string().required(),
  price: Joi.number().required().min(0),
});

const EditProduct = ({ onSubmit }: Props) => {
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      const { data } = await instance.get(`/products/${id}`);
      setProduct(data);
    })();
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>({
    resolver: joiResolver(productSchema),
  });
  const onEdit = (product: Product) => {
    onSubmit({ ...product, id });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onEdit)}>
        <h1>EditProduct</h1>
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
            defaultValue={product?.title}
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
            defaultValue={product?.price}
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
            defaultValue={product?.description}
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

export default EditProduct;
