import React from "react";

function SignIn(props) {
  const { onSignIn, error } = props;
  return (
    <div className="profile">
      <h2>Please sign-in</h2>
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
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        {error && <p>{error.error}</p>}
      </form>
    </div>
  );
}

export default SignIn;
