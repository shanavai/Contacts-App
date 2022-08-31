import React from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { Link } from "react-router-dom";
import { deleteContact } from "../../redux/Actions/ContactActions"; 

const Home = () => {
  const contacts = useSelector((state) => state.contacts);
  const dispatch = useDispatch();
  return (
    <div>
      <Link to="/add" className="btn btn-outline-dark my-5 ml-auto ">
        Add Contact
      </Link>
      {contacts.map((i) => {
        return (
          <div key={i.id}>
            <p>{i.name}</p>
            <Link to={`/edit/${i.id}`} className="btn btn-sm btn-primary mr-1">
              Edit
            </Link> 
            <button
            type="button"
            onClick={() => dispatch(deleteContact(i.id))}
            className="btn btn-sm btn-danger"
            >Delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
