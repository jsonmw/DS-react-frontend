import { useFormik } from "formik";
import { UserAccount } from "../../model/UserAccount";
import userValidationSchema from "../../validation/userValidationSchema";
import { CgDanger } from "react-icons/cg";
import { Link } from "react-router-dom";

const Register = () => {
  let isLoading = false;
  let error = false;
  let toast = null;

  const formik = useFormik<UserAccount>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: userValidationSchema,
    onSubmit: (userAccount: UserAccount, { resetForm }) => {
      console.log(
        `Account creation attempted for ${userAccount.name} -> ${userAccount.email}`
      );
      resetForm();
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="container col-md-4 col-sm-12 bg-dark mt-5 rounded-2 p-4">
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-danger">{error}</p>}
        {toast && <p className="text-primary">{toast}</p>}

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="register-name" className="form-label text-white">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="register-name"
              placeholder="Enter your name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-danger fst-italic">{formik.errors.name}</div>
            )}

            <label
              htmlFor="register-email"
              className="form-label text-white mt-4"
            >
              E-mail
            </label>
            <input
              type="email"
              className="form-control"
              id="register-email"
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
              htmlFor="register-password"
              className="form-label text-white mt-4"
            >
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="register-password"
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

            <label
              htmlFor="register-confirmPassword"
              className="form-label text-white mt-4"
            >
              Confirm password
            </label>
            <input
              type="password"
              className="form-control"
              id="register-confirmPassword"
              placeholder="Confirm password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div className="text-danger fst-italic">
                  {formik.errors.confirmPassword}
                </div>
              )}
          </div>
          {!isLoading && (
            <button className="btn btn-sm btn-outline-light" type="submit">
              Register
            </button>
          )}
          <button
            className="btn btn-sm btn-outline-light mx-1"
            type="reset"
            onClick={formik.handleReset}
          >
            Clear
          </button>
          {isLoading && (
            <button
              className="btn btn-sm btn-outline-light"
              type="submit"
              disabled
            >
              Loading...
            </button>
          )}
          <p className="mt-5 text-white text-center small fst-italic">
            Already have an account? Click{" "}
            <Link to="/login" className="text-primary">
              here
            </Link>
          </p>
        </form>
        <Link to="/" className="d-block w-auto btn btn-dark mt-5">
          Back
        </Link>
      </div>
    </div>
  );
};

export default Register;
