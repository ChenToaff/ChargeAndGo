export default function EditProfile() {
  function onSubmit(e) {
    e.preventDefault();
  }

  return (
    <div class="h-100 p-5 w-50 m-auto">
      <div class="container py-5 rounded-3">
        <div class="row g-3" style={{ "background-color": "white" }}>
          <div class="">
            <h4 class="mb-3">Edit Profile</h4>
            <form class="needs-validation" method="put" onSubmit={onSubmit}>
              <div class="row g-3">
                <div class="col-12">
                  <label for="firstName" class="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Your Name Here"
                    required
                  />
                  <div class="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>

                <div class="col-12">
                  <label for="email" class="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="you@example.com"
                  />
                  <div class="invalid-feedback">
                    Please enter a valid email address for shipping updates.
                  </div>
                </div>

                <div class="col-12">
                  <label for="phone" class="form-label">
                    Phone
                  </label>
                  <input
                    class="form-control"
                    placeholder="050-1234567"
                    required
                  />
                  <div class="invalid-feedback">Please enter your number.</div>
                </div>

                <div class="col-12">
                  <label for="password" class="form-label">
                    Password
                  </label>
                  <input type="password" class="form-control" required />
                  <div class="invalid-feedback">
                    Please enter your password.
                  </div>
                </div>

                <input
                  class="btn btn-success w-50 m-auto mt-5"
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
