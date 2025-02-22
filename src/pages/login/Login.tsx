import { useFormik } from "formik";
import { AuthRequest } from "../../model/AuthRequest";
import loginValidationSchema from "../../validation/loginValidationSchema";
import { Link } from "react-router-dom";

function Login() {
  let isLoading = false; // placeholder for hook

  const formik = useFormik<AuthRequest>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (authRequest: AuthRequest) => {
      console.log("Attempting to login user:", authRequest.email);
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center w-auto">
      <div className="container col-md-4 col-sm-12 bg-dark mt-5 rounded-2 p-4">
        {isLoading && <p>Loading content</p>}

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="login-email" className="form-label text-white mt-3">
              E-mail
            </label>
            <input
              type="email"
              className="form-control"
              id="login-email"
              placeholder="Enter your e-mail"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-danger fst-italic">
                {formik.errors.email}
              </div>
            )}

            <label
              htmlFor="login-password"
              className="form-label text-white mt-3"
            >
              Password
            </label>
            <input
              type="password"
              className="form-control mb-3"
              id="password"
              placeholder="Enter your password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-danger fst-italic">
                {formik.errors.password}
              </div>
            )}

            <button
              className="btn btn-sm btn-outline-light"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Register"}
            </button>

            <button
              className="btn btn-sm btn-outline-light mx-1"
              type="reset"
              onClick={formik.handleReset}
            >
              Clear
            </button>
            
            <p className="mt-5 text-white text-center small fst-italic">
              Need an account? Click{" "}
              <Link to="/register" className="text-primary">
                here
              </Link>
            </p>
            <Link to="/" className="d-block w-auto btn btn-dark mt-5">
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
