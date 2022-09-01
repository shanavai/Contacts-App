import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/exports";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { editContact } from "../redux/Actions/ContactActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const EditContact = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts);
  const { id } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

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

    if (!/^[0-9+/]*$/.test(number)) {
      return toast.warning("Please fill in Valid Phone Number");
    }

    const checkIfEmailExists = contacts.filter((contact) =>
      contact.email === email && contact.id !== currentContact.id
        ? contact
        : null
    );
    const checkIfPhoneExists = contacts.filter((contact) =>
      contact.phone === number && contact.id !== currentContact.id
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

  const cancelEditing = () => {
    navigate("/");
  };

  return (
    <> 
      <form onSubmit={submitEdit}>
        <input
          type="text"
          placeholder="change name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="change Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="change number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <button>submit</button>
        <button onClick={cancelEditing}>cancel</button>
      </form>
    </>
  );
};

export default EditContact;
