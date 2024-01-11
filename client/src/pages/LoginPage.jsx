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
    <div className="bg-slate-600 max-w-md p-10 rounded-md">
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

        <label htmlFor="">email</label>
        <input
          type="text"
          {...register("email", { required: {
            value: true,
            message: "this camp is required",
          } })}
          className="bg-zinc-500 w-full px-4 py-2 rounded-sm my-2"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <label htmlFor="">password</label>
        <input
          type="password"
          {...register("password", { required: {
            value: true,
            message: "this camp is required",
          } })}
          className="bg-zinc-500 w-full px-4 py-2 rounded-sm my-2"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <button type="submit">submit</button>
        <p>no tenes cuenta? <Link to={'/register'}>login</Link></p>
      </form>
    </div>
  );
}

export default LoginPage;
