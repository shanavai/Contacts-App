import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import addContact from "../redux/Actions/ContactActions";
import { toast } from "react-toastify";

const AddContact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [name, setName] = useState("");
  const [number, setNumber] = useState();
  const contacts = useSelector((state) => state.contacts);

  const id = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
  const addNewContact = (event) => {
    event.preventDefault();

    // Validating inputs

    if (
      email.trim().length < 1 ||
      name.trim().length < 1 ||
      number.trim().length < 1
    ) {
      return toast.warning("Please fill in all fields!!");
    }

    const emailValidator = email.includes("@");

    if (!emailValidator) {
      return toast.warning("Please fill in Valid Email");
    }

    // Regular expression to validate the phone number input
    if (!/^[0-9+/]*$/.test(number)) {
      return toast.warning("Please fill in Valid Phone Number");
    }
    const checkIfEmailExists = contacts.filter((contact) =>
      contact.email === email ? contact : null
    );

    const checkIfNumberExists = contacts.filter((contact) =>
      contact.number === number ? contact : null
    );

    if (checkIfEmailExists.length > 0) {
      return toast.error("This email already exists!!");
    }

    if (checkIfNumberExists.length > 0) {
      return toast.error("This Phone Number already exists!!");
    }

    const data = {
      id,
      email,
      name,
      number,
    };
    dispatch(addContact(data));
    navigate("/");
  };

  return (
    <div style={{ marginLeft: "38rem", marginTop: "12rem" }}>
      <form style={{ marginRight: "100px" }} onSubmit={addNewContact}>
        <input
          type="text"
          placeholder="Add Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Add Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Add Phone Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <button>submit</button>
      </form>
    </div>
  );
};

export default AddContact;
