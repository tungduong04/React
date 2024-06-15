import { User } from "@/interfaces/User";
import instance from "@/services";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const userSchema = Joi.object({
  email: Joi.string().required().email({ tlds: false }),
  password: Joi.string().required().min(6),
});

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: joiResolver(userSchema),
  });
  const onSubmit = (user: User) => {
    (async () => {
      const { data } = await instance.post("/login", user);
      console.log(data);
      if (data.user) {
        sessionStorage.setItem("access", data.access);
        const isConfirm = confirm("thanh cong");
        if (isConfirm) {
          navigate("/");
        }
      }
    })();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>
        <div className="form-group">
          <label htmlFor="">email</label>
          <input
            type="text"
            className="form-control"
            {...register("email", {
              required: true,
            })}
          />
          {errors.email && (
            <div className="text-danger">{errors.email.message}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="">password</label>
          <input
            type="number"
            className="form-control"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password && (
            <div className="text-danger">{errors.password.message}</div>
          )}
        </div>

        <button className="btn btn-primary ">Submit</button>
      </form>
    </div>
  );
};

export default Login;
