export default function EditProfile() {
  function onSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="h-100 p-5 w-50 m-auto">
      <div className="container py-5 rounded-3">
        <div className="row g-3" style={{ "background-color": "white" }}>
          <div className="">
            <h4 className="mb-3">Edit Profile</h4>
            <form className="needs-validation" method="put" onSubmit={onSubmit}>
              <div className="row g-3">
                <div className="col-12">
                  <label for="firstName" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Name Here"
                    required
                  />
                  <div className="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>

                <div className="col-12">
                  <label for="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="you@example.com"
                  />
                  <div className="invalid-feedback">
                    Please enter a valid email address for shipping updates.
                  </div>
                </div>

                <div className="col-12">
                  <label for="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    className="form-control"
                    placeholder="050-1234567"
                    required
                  />
                  <div className="invalid-feedback">
                    Please enter your number.
                  </div>
                </div>

                <div className="col-12">
                  <label for="password" className="form-label">
                    Password
                  </label>
                  <input type="password" className="form-control" required />
                  <div className="invalid-feedback">
                    Please enter your password.
                  </div>
                </div>

                <input
                  className="btn btn-success w-50 m-auto mt-5"
                  type="submit"
                  value="Submit"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
