import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/exports";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { editContact } from "../redux/Actions/ContactActions";
import { useDispatch } from "react-redux";

const EditContact = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts);
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const currentContact = contacts.find(
    (contact) => contact.id === parseInt(id)
  );

  useEffect(() => {
    setName(currentContact.name);
    setNumber(currentContact.number);
  }, [currentContact]);

  const submitEdit = (event) => {
    event.preventDefault();
    const data = {
      id: currentContact.id,
      name: name,
      number: number,
    };
    console.log("data", data);
    dispatch(editContact(data));
    navigate("/");
  };

  const cancelEditing = () => {
    navigate("/");
  };

  return (
    <>
      <div>Hi Edit Contact {id}</div>
      <form onSubmit={submitEdit}>
        <input
          type="text"
          placeholder="change name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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

// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import addContact  from '../redux/Actions/ContactActions';
// import { useParams } from 'react-router-dom';

// const EditContact = () => {
//   const {ide} = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [id, setId] = useState();
//   const [name, setName] = useState("");
//   const [number, setNumber] = useState();

//   const addNewContact = (event) =>{
//     event.preventDefault();
//     const data = {
//       id,
//       name,
//       number
//     }
//     dispatch(addContact(data));
//     navigate('/')
//   }

//   return (
//     <div style={{marginLeft: "38rem",marginTop: "12rem" }}>
//        <div>Hi Edit Contact {ide}</div>
//       <form style={{marginRight:"100px"}} onSubmit={addNewContact} >
//         <input type="text" placeholder='add id' value={id} onChange={(e) => setId(e.target.value)}/>
//         <input type="text" placeholder='add name' value={name} onChange={(e) => setName(e.target.value)}/>
//         <input type="text" placeholder='add number' value={number} onChange={(e) => setNumber(e.target.value)}/>
//         <button >submit</button>
//       </form>
//     </div>
//   )
// }

// export default EditContact;
