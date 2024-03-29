function SignUp({ onSubmit }) {
  return (
    <div className="event-detail">
      <h2>Sign up with us!</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="InputUsername">Username</label>
          <input
            type="text"
            className="form-control"
            id="InputUsername"
            name="username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="InputEmail">Email address</label>
          <input
            type="email"
            className="form-control"
            id="InputEmail"
            name="email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="InputPassword" auto>
            Password
          </label>
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
      </form>
    </div>
  );
}

export default SignUp;
