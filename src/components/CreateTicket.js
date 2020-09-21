import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

const formSchema = yup.object().shape({
  name: yup.string().required("Title is a required field"),
  description: yup
    .string()
    .required("Must include an description"),
    wit: yup.string().required("let us know what have you tried"),
  category: yup.string()
});

export default function CreateTicket() {
  // managing state for our form inputs
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    category: "",
    wit: ""
  });

  // state for our errors
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    category: "",
    wit: ""
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // new state to set our post request too. So we can console.log and see it.
  const [post, setPost] = useState([]);

  /* Each time the form value state is updated, check to see if it is valid per our schema. 
  This will allow us to enable/disable the submit button.*/
  useEffect(() => {
    /* We pass the entire state into the entire schema, no need to use reach here. 
    We want to make sure it is all valid before we allow a user to submit
    isValid comes from Yup directly */
    formSchema.isValid(formState).then(valid => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  const validateChange = e => {
    // Reach will allow us to "reach" into the schema and test only one part.
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(valid => {
        setErrors({
          ...errors,
          [e.target.name]: ""
        });
      })
      .catch(err => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors
        });
      });
  };
  const formSubmit = e => {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/users", formState)
      .then(res => {
        setPost(res.data);
        console.log("success", post);

        setFormState({
          name: "",
          description: "",
          wit: "",
          category: ""
        });
      })
      .catch(err => {
        console.log(err.res);
      });
  };

  const inputChange = e => {
    e.persist();
    const newFormData = {
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value
    };
    validateChange(e);
    setFormState(newFormData);
  };

  return (
    <form onSubmit={formSubmit}>
      <label htmlFor="name">
        Title
        <input
          id="name"
          type="text"
          name="name"
          value={formState.name}
          onChange={inputChange}
        />
        {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}

      </label>
      <label htmlFor="description">
      Description
        <input
          id="description"
          type="text"
          name="description"
          value={formState.description}
          onChange={inputChange}
        />
        {errors.description.length > 0 ? (
          <p className="error"> {errors.description}</p>
        ) : null}
      </label>

      {/* what have i tried */}
      <label htmlFor="wit">
        What Have You Tried?
        <textarea
          id="wit"
          name="wit"
          value={formState.wit}
          onChange={inputChange}
        />
        {errors.wit.length > 0 ? (
          <p className="error">{errors.wit}</p>
        ) : null}

        {/* categories */}
      </label>
      <label htmlFor="category">
      Category
        <select id="category" name="category" onChange={inputChange}>
          <option value="Web Fundamentals">Web Fundamentals</option>
          <option value="Web Applications I">Web Applications I</option>
          <option value="Web Applications II">Web Applications II</option>
          <option value="Web API: Node">Web API: Node</option>
          <option value="Web API: Java">Web API: Java</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Lambda Labs">Lambda Labs</option>
        </select>
      </label>

     {/* submit button */}
      <button disabled={buttonDisabled}>Submit</button>
      {/* data post */}
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </form>
  );
}
