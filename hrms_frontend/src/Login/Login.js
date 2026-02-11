import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../helper/BaseUrl";

const Login = () => {

  const navigate = useNavigate();

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });

  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const emailIsInvalid = useMemo(
    () => didEdit.email && !enteredValues.email.includes("@"),
    [didEdit.email, enteredValues.email]
  );

  const passwordIsInvalid = useMemo(
    () => didEdit.password && enteredValues.password.length < 6,
    [didEdit.password, enteredValues.password]
  );

  const handleInputBlur = useCallback(
    (identifier) => {
      setDidEdit((prevEdit) => ({
        ...prevEdit,
        [identifier]: true,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setErrorMessage("");

      if (!emailIsInvalid && !passwordIsInvalid) {
        setLoading(true);

        const payload = {
          email: enteredValues.email,
          password: enteredValues.password,
        };

        try {
          const response = await axios.post(`${BaseUrl}api/login`, payload);
          setLoading(false);

          if (response.data.error) {
            setErrorMessage(
              response.data.message || "Login failed, please try again."
            );
          } else {
            localStorage.setItem("TokenBigBin", response.data.accessToken);
            localStorage.setItem("username", response.data.username);
            localStorage.setItem("email", response.data.email);
            navigate("/");
          }
        } catch (error) {
          setLoading(false);
          console.error("An error occurred", error);
          setErrorMessage("An error occurred, please refresh page.");
        }
      }
    },
    [enteredValues, emailIsInvalid, passwordIsInvalid, navigate]
  );

  const handleInputValues = useCallback((identifier, value) => {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: false,
    }));
  }, []);

  return (
    <section className="log-in-area">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-4">
            <div className="login-form-wrap">
              <form onSubmit={handleSubmit}>
                <h1 className="heading center-heading">Login</h1>

                <div className="login-inputs">
                  <div className="login-input-control">
                    <label>Email</label>
                    <input
                      id="email"
                      className="form-control"
                      type="email"
                      name="email"
                      onBlur={() => handleInputBlur("email")}
                      onChange={(event) => {
                        handleInputValues("email", event.target.value);
                      }}
                      value={enteredValues.email}
                    />
                    {emailIsInvalid && (
                      <p className="control-error">
                        Please enter a valid email address.
                      </p>
                    )}
                  </div>

                  <div className="login-input-control">
                    <label>Password</label>
                    <input
                      className="form-control"
                      id="password"
                      type="password"
                      name="password"
                      onBlur={() => handleInputBlur("password")}
                      onChange={(event) => {
                        handleInputValues("password", event.target.value);
                      }}
                      value={enteredValues.password}
                    />
                    {passwordIsInvalid && (
                      <p className="control-error">
                        Password must be at least 6 characters long.
                      </p>
                    )}
                  </div>
                </div>
                <div className="login-submit-btn">
                  <button type="submit" className="default-btn">
                    {loading ? "Logging in..." : "Login"}
                    <span></span>
                  </button>
                </div>
                {errorMessage && (
                  <div className="error-message">
                    <p>{errorMessage}</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
