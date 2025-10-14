import React, { useEffect, useRef } from "react";

function Home() {
  const formRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const form = formRef.current;
    const modalEl = modalRef.current;

    if (!form || !modalEl) return;

    // Inputs
    const phoneNumberInput = form.querySelector("#phoneNumber");
    const termsCheckbox = form.querySelector("#termsCheckbox");
    const termsError = form.querySelector("#termsError");

    // Format phone as user types
    const phoneError =
      phoneNumberInput.closest(".form-floating").nextElementSibling;
    const onPhoneInput = () => {
      let v = phoneNumberInput.value.replace(/\D/g, "");
      if (v.length <= 3) v = v.replace(/(\d{0,3})/, "$1");
      else if (v.length <= 6) v = v.replace(/(\d{3})(\d{0,3})/, "$1-$2");
      else v = v.replace(/(\d{3})(\d{3})(\d{0,4})/, "$1-$2-$3");
      phoneNumberInput.value = v;
      phoneNumberInput.classList.remove("is-invalid");
      phoneError.style.display = "none";
    };
    phoneNumberInput.addEventListener("input", onPhoneInput);

    // Terms checkbox live feedback
    const onTermsChange = () => {
      termsError.style.display = termsCheckbox.checked ? "none" : "block";
    };
    termsCheckbox.addEventListener("change", onTermsChange);

    // Clear per-field errors as user types
    const controls = form.querySelectorAll(".form-control");
    const onFieldInput = function () {
      const err = this.closest(".form-floating").nextElementSibling;
      if (this.value.trim() !== "") {
        this.classList.remove("is-invalid");
        if (err) err.style.display = "none";
      }
    };
    controls.forEach((i) => i.addEventListener("input", onFieldInput));

    // Eye toggles
    const eye1 = form.querySelector("#eyeIcon");
    const eye2 = form.querySelector("#eyeIcon2");
    const password = form.querySelector("#password");
    const confirmPassword = form.querySelector("#confirmPassword");
    const toggleEye = (eyeEl, target) => {
      target.type = target.type === "password" ? "text" : "password";
      eyeEl.classList.toggle("bi-eye");
      eyeEl.classList.toggle("bi-eye-slash");
    };
    const onEye1 = () => toggleEye(eye1, password);
    const onEye2 = () => toggleEye(eye2, confirmPassword);
    eye1.addEventListener("click", onEye1);
    eye2.addEventListener("click", onEye2);

    // Submit + validation
    const onSubmit = (event) => {
      event.preventDefault();
      let isValid = true;

      const nameInput = form.querySelector("#fullName");
      const nameError = nameInput.closest(".form-floating").nextElementSibling;
      if (nameInput.value.trim().length < 4) {
        isValid = false;
        nameInput.classList.add("is-invalid");
        nameError.style.display = "block";
        nameError.textContent = "Full Name must be at least 4 characters long.";
      } else {
        nameInput.classList.remove("is-invalid");
        nameError.style.display = "none";
      }

      const emailInput = form.querySelector("#usernameOrEmail");
      const emailError = emailInput.closest(".form-floating").nextElementSibling;
      const emailPattern =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        isValid = false;
        emailInput.classList.add("is-invalid");
        emailError.style.display = "block";
        emailError.textContent = "Please enter a valid email address.";
      } else {
        emailInput.classList.remove("is-invalid");
        emailError.style.display = "none";
      }

      const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
      const phoneValue = phoneNumberInput.value.trim();
      if (phoneValue === "") {
        isValid = false;
        phoneNumberInput.classList.add("is-invalid");
        phoneError.style.display = "block";
        phoneError.textContent = "Phone Number is required.";
      } else if (!phonePattern.test(phoneValue)) {
        isValid = false;
        phoneNumberInput.classList.add("is-invalid");
        phoneError.style.display = "block";
        phoneError.textContent =
          "Please enter a valid phone number in the format XXX-XXX-XXXX.";
      } else {
        phoneNumberInput.classList.remove("is-invalid");
        phoneError.style.display = "none";
      }

      const passwordError =
        password.closest(".form-floating").nextElementSibling;
      const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
      if (!passwordPattern.test(password.value.trim())) {
        isValid = false;
        password.classList.add("is-invalid");
        passwordError.style.display = "block";
        passwordError.textContent =
          "Password must be at least 8 characters long, and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.";
      } else {
        password.classList.remove("is-invalid");
        passwordError.style.display = "none";
      }

      const confirmError =
        confirmPassword.closest(".form-floating").nextElementSibling;
      if (confirmPassword.value.trim() === "") {
        isValid = false;
        confirmPassword.classList.add("is-invalid");
        confirmError.style.display = "block";
        confirmError.textContent = "Confirm Password is required.";
      } else if (confirmPassword.value !== password.value) {
        isValid = false;
        confirmPassword.classList.add("is-invalid");
        confirmError.style.display = "block";
        confirmError.textContent = "Passwords do not match.";
      } else {
        confirmPassword.classList.remove("is-invalid");
        confirmError.style.display = "none";
      }

      if (!termsCheckbox.checked) {
        isValid = false;
        termsError.style.display = "block";
      } else {
        termsError.style.display = "none";
      }

      // If valid, hide modal and reset
      if (isValid) {
        const modalInstance =
          window.bootstrap?.Modal.getInstance(modalEl) ||
          new window.bootstrap.Modal(modalEl);
        modalInstance.hide();
        form.reset(); // values clear only upon successful submit
      }
    };
    form.addEventListener("submit", onSubmit);

    // When modal is fully hidden, clear errors + (optionally) fields
    const onHidden = () => {
      const inputs = form.querySelectorAll(".form-control");
      inputs.forEach((input) => {
        input.classList.remove("is-invalid");
        const err = input.closest(".form-floating").nextElementSibling;
        if (err) err.style.display = "none";
      });
      termsCheckbox.checked = false;
      termsError.style.display = "none";
      // NOTE: we do NOT force-reset values here, so partially-filled data
      // remains if the user closes the modal manually. Remove the next line
      // if you want to keep values between opens:
      // form.reset();
    };
    modalEl.addEventListener("hidden.bs.modal", onHidden);

    // Cleanup
    return () => {
      phoneNumberInput.removeEventListener("input", onPhoneInput);
      termsCheckbox.removeEventListener("change", onTermsChange);
      controls.forEach((i) => i.removeEventListener("input", onFieldInput));
      eye1.removeEventListener("click", onEye1);
      eye2.removeEventListener("click", onEye2);
      form.removeEventListener("submit", onSubmit);
      modalEl.removeEventListener("hidden.bs.modal", onHidden);
    };
  }, []);

  return (
    <>
      {/* NAV */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid px-md-5">
          <a className="navbar-brand" href="index.html">
            Verdict <span className="text-success">Law Firm</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
            aria-controls="mainNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item active">
                <a href="index.html" className="nav-link">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a href="about.html" className="nav-link">
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a href="practice-areas.html" className="nav-link">
                  Practice Areas
                </a>
              </li>
              <li className="nav-item">
                <a href="case.html" className="nav-link">
                  Case Studies
                </a>
              </li>
              <li className="nav-item">
                <a href="attorneys.html" className="nav-link">
                  Attorneys
                </a>
              </li>
              <li className="nav-item">
                <a href="blog.html" className="nav-link">
                  Blog
                </a>
              </li>
              <li className="nav-item">
                <a href="contact.html" className="nav-link">
                  Contact
                </a>
              </li>
            </ul>

            <div className="ms-lg-3 mt-3 mt-lg-0">
              <a href="Loginpage.html" className="btn btn-outline-light btn-sm me-2">
                Login
              </a>
              <button
                className="btn btn-primary btn-sm"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <div
        className="hero-wrap position-relative"
        style={{
          minHeight: "80vh",
          backgroundImage: "url('images/bg_1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="overlay"
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,.35)",
          }}
        />
        <div className="container-fluid px-md-5 py-5 position-relative">
          <div className="row align-items-center" style={{ minHeight: "60vh" }}>
            <div className="col-md-7 text-white">
              <h2 className="subheading">Client-First Legal Services</h2>
              <h1 className="mb-4 fw-bold">Experienced Lawyers. Clear Advice. Real Results.</h1>
              <p className="mb-4">
                From complex corporate matters to personal disputes, our team brings practical
                strategy and transparent communication.
              </p>
              <p>
                <a href="contact.html" className="btn btn-light me-2">
                  Book a Free Consultation
                </a>
                <a href="practice-areas.html" className="btn btn-outline-light">
                  Explore Practice Areas
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SERVICES (simple, like your HTML) */}
      <section className="py-5">
        <div className="container-fluid px-md-5">
          <div className="row g-4">
            {[
              {
                n: "01",
                h: "Get Your Legal Advice",
                p: "Understand your options and next steps with a quick consult.",
              },
              {
                n: "02",
                h: "Work with Expert Lawyers",
                p: "Dedicated specialists in corporate, criminal, family, and more.",
              },
              {
                n: "03",
                h: "Clear, Fair Fees",
                p: "Upfront pricing and tailored scopes—no surprises.",
              },
              {
                n: "04",
                h: "Secure Document Review",
                p: "Share files safely and track your case in one place.",
              },
            ].map((it) => (
              <div className="col-md-3" key={it.n}>
                <div className="p-3 border h-100">
                  <span className="text-muted">{it.n}</span>
                  <h5 className="mt-2">{it.h}</h5>
                  <p className="mb-0">{it.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== REGISTER MODAL (Bootstrap 5) ===== */}
      <div
        className="modal fade"
        id="loginModal"
        tabIndex={-1}
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content p-3 p-md-4">
            <div className="modal-header border-0">
              <h3 className="modal-title w-100 text-center" id="loginModalLabel">
                Register
              </h3>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>

            <div className="modal-body">
              <form action="#" method="POST" id="registerForm" ref={formRef}>
                {/* Full Name */}
                <div className="form-floating position-relative">
                  <input type="text" className="form-control" id="fullName" placeholder="Full Name" name="full_name" />
                  <label htmlFor="fullName">Full Name</label>
                </div>
                <small className="text-danger error-message mb-3" style={{ display: "none" }}>
                  This field is required.
                </small>

                {/* Email */}
                <div className="form-floating position-relative">
                  <input
                    type="text"
                    className="form-control"
                    id="usernameOrEmail"
                    placeholder="Username or Email"
                    name="username_or_email"
                  />
                  <label htmlFor="usernameOrEmail">Email</label>
                </div>
                <small className="text-danger error-message mb-3" style={{ display: "none" }}>
                  This field is required.
                </small>

                {/* Phone */}
                <div className="form-floating position-relative">
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNumber"
                    placeholder="Phone Number"
                    name="phone_number"
                  />
                  <label htmlFor="phoneNumber">Phone Number</label>
                </div>
                <small className="text-danger error-message mb-3" style={{ display: "none" }}>
                  This field is required.
                </small>

                {/* Password */}
                <div className="form-floating position-relative">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    name="password"
                  />
                  <label htmlFor="password">Password</label>
                  <i className="bi bi-eye-slash position-absolute" style={{ right: 14, top: "50%", transform: "translateY(-50%)", cursor: "pointer" }} id="eyeIcon" />
                </div>
                <small className="text-danger error-message mb-3" style={{ display: "none" }}>
                  This field is required.
                </small>

                {/* Confirm Password */}
                <div className="form-floating position-relative">
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    name="confirm_password"
                  />
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <i className="bi bi-eye-slash position-absolute" style={{ right: 14, top: "50%", transform: "translateY(-50%)", cursor: "pointer" }} id="eyeIcon2" />
                </div>
                <small className="text-danger error-message mb-3" style={{ display: "none" }}>
                  This field is required.
                </small>

                {/* Terms */}
                <div className="form-check d-flex align-items-center mb-2">
                  <input className="form-check-input" type="checkbox" id="termsCheckbox" name="terms" />
                  <label className="form-check-label ms-2" htmlFor="termsCheckbox">
                    <a href="#" className="text-decoration-none">
                      I accept the Terms and Conditions
                    </a>
                  </label>
                </div>
                <small className="text-danger error-message" id="termsError" style={{ display: "none" }}>
                  You must accept the Terms and Conditions.
                </small>

                <button type="submit" className="btn btn-success mt-2">
                  Submit
                </button>
              </form>
            </div>

            <div className="modal-footer border-0 d-flex justify-content-center w-100 mt-0 pt-0">
              <p className="small">
                Already have account?{" "}
                <a href="Loginpage.html" className="text-decoration-none">
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
