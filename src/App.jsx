/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function App() {
  return <Form />;
}

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  function onSubmit(data) {
    console.log(data);
    reset();
    setSubmissionSuccess(true);
  }

  return (
    <div className="position-box">
      {submissionSuccess && (
        <div className="success-message-box show">
          <div className="success-message-flex">
            <img src="/icon-success-check.svg" alt="success check" />
            <p className="success-message__title">Message Sent!</p>
          </div>
          <p className="success-message__description">
            Thanks for completing the form. We'll be in touch soon!
          </p>
        </div>
      )}

      <form className="form-box" onSubmit={handleSubmit(onSubmit)}>
        <p className="form-title">Contact Us</p>
        <FormGroup register={register} errors={errors} />
        <FormInput register={register} errors={errors} />
        <FormGroupSelect register={register} errors={errors} />
        <FormMessage register={register} errors={errors} />
        <FormSelect register={register} errors={errors} />
        <Submit />
      </form>
    </div>
  );
}

function FormGroup({ register, errors }) {
  return (
    <div className="form-group-box">
      <div className="form-input-box">
        <label>
          First name <span>*</span>
        </label>
        <input
          {...register("firstName", {
            required: "This field is required",
          })}
          type="text"
          className={errors.firstName ? "error-input" : ""}
        />
        {errors.firstName && (
          <span className="error">{errors.firstName.message}</span>
        )}
      </div>
      <div className="form-input-box">
        <label>
          Last name <span>*</span>
        </label>
        <input
          {...register("lastName", {
            required: "This field is required",
          })}
          type="text"
          className={errors.lastName ? "error-input" : ""}
        />
        {errors.lastName && (
          <span className="error">{errors.lastName.message}</span>
        )}
      </div>
    </div>
  );
}

function FormInput({ register, errors }) {
  return (
    <div className="form-input-box">
      <label>
        Email Address <span>*</span>
      </label>
      <input
        {...register("email", {
          required: "Please enter a valid email address",
          validate: (value) => {
            if (!value.includes("@")) {
              return "Please enter a valid email address";
            }
            return true;
          },
        })}
        type="email"
        className={errors.email ? "error-input" : ""}
      />
      {errors.email && <span className="error">{errors.email.message}</span>}
    </div>
  );
}

function FormGroupSelect({ register, errors }) {
  return (
    <div className="form-groupselect-box">
      <label>
        Query Type <span>*</span>
      </label>
      <div className="form-select-box">
        <div className="select-box">
          <input
            type="radio"
            value="General Enquiry"
            {...register("queryType", {
              required: "Please select a query type",
            })}
          />
          General Enquiry
        </div>
        <div className="select-box">
          <input
            type="radio"
            value="Support Request"
            {...register("queryType", {
              required: "Please select a query type",
            })}
          />
          Support Request
        </div>
      </div>
      {errors.queryType && (
        <span className="error">{errors.queryType.message}</span>
      )}
    </div>
  );
}

function FormMessage({ register, errors }) {
  return (
    <div className="form-input-box">
      <label>
        Message <span>*</span>
      </label>
      <textarea
        className={`form-message ${errors.message ? "error-input" : ""}`}
        {...register("message", {
          required: "This field is required",
        })}
      />
      {errors.message && (
        <span className="error">{errors.message.message}</span>
      )}
    </div>
  );
}

function FormSelect({ register, errors }) {
  return (
    <div className="form-groupselect-box">
      <div className="form-select">
        <input
          type="checkbox"
          {...register("consent", {
            required: "To submit this form please consent to being contacted",
          })}
          className={errors.consent ? "error-input" : ""}
        />
        <p>
          I consent to being contacted by the team <span>*</span>
        </p>
      </div>
      {errors.consent && (
        <span className="error">{errors.consent.message}</span>
      )}
    </div>
  );
}

function Submit() {
  return (
    <button type="submit" className="submit-button">
      Submit
    </button>
  );
}
