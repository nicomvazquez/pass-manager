import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { singin, user, errors: loginErrors, isAutenticated } = useAuth();

  useEffect(() => {
    if (isAutenticated) navigate("/posts");
  }, [isAutenticated]);

  return (
    <div className="bg-slate-600 max-w-md p-10 rounded-md m-auto">
      <form
        onSubmit={handleSubmit(async (values) => {
          console.log(values);
          singin(values);
        })}
      >
        {loginErrors.map((message, i) => (
          <div className="bg-red-500 p-2" key={i}>
            {message.error}
          </div>
        ))}

        <label className="text-2xl">email</label>
        <input
          type="text"
          {...register("email", {
            required: {
              value: true,
              message: "this camp is required",
            },
          })}
          className="bg-zinc-500 w-full px-4 py-2 rounded-sm my-2"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <label className="text-2xl">password</label>
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

        <button type="submit" className="bg-green-700 px-3 py-2 rounded-md">
          submit
        </button>
        <p className="mt-7">
          no tenes cuenta?{" "}
          <Link to={"/register"} className="text-emerald-600">
            register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
