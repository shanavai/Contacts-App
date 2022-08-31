import React, { useState } from 'react' 
import { useNavigate } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import addContact  from '../redux/Actions/ContactActions';

const AddContact = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [name, setName] = useState("");
  const [number, setNumber] = useState();
  
  const id = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
  const addNewContact = (event) =>{
    event.preventDefault(); 
    const data = {
      id,
      email,
      name,
      number
    } 
    dispatch(addContact(data));
    navigate('/')
  }

  return (
    <div style={{marginLeft: "38rem",marginTop: "12rem" }}>
      <form style={{marginRight:"100px"}} onSubmit={addNewContact} >
        <input type="text" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)}/>  
        <input type="text" placeholder='add name' value={name} onChange={(e) => setName(e.target.value)}/> 
        <input type="text" placeholder='add number' value={number} onChange={(e) => setNumber(e.target.value)}/> 
        <button >submit</button>
      </form>
    </div>
  )
}

export default AddContact;
