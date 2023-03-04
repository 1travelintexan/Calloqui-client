import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../context/allContext";

function SignIn({ onSignIn, error }) {
  const { user } = useContext(AllContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);
  return (
    <main className="event-detail">
      <h2>Please Log-In</h2>
      <form onSubmit={onSignIn}>
        <div className="form-group">
          <label htmlFor="InputEmail">Email address</label>
          <input
            type="email"
            className="form-control"
            id="InputEmail"
            name="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="InputPassword">Password</label>
          <input
            name="password"
            type="password"
            className="form-control"
            id="InputPassword"
            autoComplete="on"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <h6 className="error">{error && <p>{error}</p>}</h6>
      </form>
    </main>
  );
}

export default SignIn;
