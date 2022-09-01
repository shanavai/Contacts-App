import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/exports";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { editContact } from "../../redux/Actions/ContactActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const EditContact = () => {
  const contacts = useSelector((state) => state.contacts);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const currentContact = contacts.find(
    (contact) => contact.id === parseInt(id)
  );

  useEffect(() => {
    setName(currentContact.name);
    setNumber(currentContact.number);
    setEmail(currentContact.email);
  }, [currentContact]);

  const submitEdit = (event) => {
    event.preventDefault();

    //Validating inputs
    if (
      email.trim().length < 1 ||
      name.trim().length < 1 ||
      number.trim().length < 1
    ) {
      return toast.warning("Please fill in all fields!!");
    }

    const checkIfEmailExists = contacts.filter((contact) =>
      contact.email === email && contact.id !== currentContact.id
        ? contact
        : null
    );

    const checkIfPhoneExists = contacts.filter((contact) =>
      contact.number === number && contact.id !== currentContact.id
        ? contact
        : null
    );

    if (checkIfEmailExists.length > 0) {
      return toast.error("This email already exists!!");
    }

    if (checkIfPhoneExists.length > 0) {
      return toast.error("This phone number already exists!!");
    }

    const data = {
      id: currentContact.id,
      name: name,
      number: number,
    };
    dispatch(editContact(data));
    navigate("/");
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row d-flex flex-column">
        <h3 className="text-center py-3 display-3">Edit Contact</h3>
        <div className="col-md-4 p-5 mx-auto shadow">
          {currentContact ? (
            <form onSubmit={submitEdit}>
              <div className="form-group">
                <input
                  className="form-control"
                  value={name}
                  placeholder={"Name"}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  value={email}
                  placeholder={"Email"}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  value={number}
                  placeholder={"Phone"}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>
              <div className="form-group d-flex align-items-center justify-content-between my-2">
                <button type="submit" className="btn btn-primary">
                  Update Contact
                </button>
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={() => navigate("/")}
                >
                  cancel
                </button>
              </div>
            </form>
          ) : (
            <h1 className="text-center">No Contact Found</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditContact;
