import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; 
import { toast } from "react-toastify";
import addContact from "../../redux/Actions/ContactActions";

const AddContact = () => {
  const contacts = useSelector((state) => state.contacts);
  const [email, setEmail] = useState();
  const [name, setName] = useState("");
  const [number, setNumber] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <div className="container-fluid mt-5">
      <h3 className="text-center py-3 display-3">Add Contact</h3>
      <div className="row">
        <div className="col-md-4 p-5 mx-auto shadow">
          <form onSubmit={addNewContact}>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="number"
                placeholder="Phone"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div className="col text-center ">
              <input
                className="btn btn-block btn-dark mt-3 "
                type="submit"
                value="Add"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddContact;
