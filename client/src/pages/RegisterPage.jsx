import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const { singup, user, errors: registerErrors, isAutenticated } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAutenticated) navigate("/posts");
  }, [isAutenticated]);

  return (
    <div className="bg-slate-600 max-w-md p-10 rounded-md m-auto">
      {registerErrors.map((message, i) => (
        <div className="bg-red-500 p-2" key={i}>
          {message.error}
        </div>
      ))}

      <form
        onSubmit={handleSubmit(async (values) => {
          console.log(values);
          singup(values);
        })}
      >
        <label htmlFor="" className="text-2xl">
          email
        </label>
        <input
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "this camp is required",
            },
          })}
          className="bg-zinc-500 w-full px-4 py-2 rounded-sm my-2"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <label htmlFor="" className="text-2xl">
          username
        </label>
        <input
          type="text"
          {...register("username", {
            required: {
              value: true,
              message: "this camp is required",
            },
          })}
          className="bg-zinc-500 w-full px-4 py-2 rounded-sm my-2"
        />
        {errors.username && (
          <p className="text-red-500">{errors.username.message}</p>
        )}

        <label htmlFor="" className="text-2xl">
          password
        </label>
        <input
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "this camp is required",
            },
          })}
          className="bg-zinc-500 w-full px-4 py-2 rounded-sm my-2"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <label htmlFor="" className="text-2xl">
          confirm password
        </label>
        <input
          type="password"
          {...register("comfirm", {
            required: {
              value: true,
              message: "this camp is required",
            },
            validate: (value) => {
              if (value === watch("password")) {
                return true;
              } else {
                return "password not mach";
              }
            },
          })}
          className="bg-zinc-500 w-full px-4 py-2 rounded-sm my-2"
        />
        {errors.comfirm && (
          <p className="text-red-500">{errors.comfirm.message}</p>
        )}

        <button type="submit" className="bg-green-700 px-3 py-2 rounded-md">
          submit
        </button>
        <p className="mt-7">
          ya tenes cuenta?{" "}
          <Link to={"/login"} className="text-emerald-600">
            login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
