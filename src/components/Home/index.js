import React from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { Link } from "react-router-dom";
import { deleteContact } from "../../redux/Actions/ContactActions";

const Home = () => {
  const contacts = useSelector((state) => state.contacts);
  const dispatch = useDispatch();

  return (
    <div className="container">
      <div className="row d-flex flex-column">
        <Link to="/add" className="btn btn-outline-dark my-5 ml-auto ">
          Add Contact
        </Link>
        {contacts.length > 0 ? (
          <div className="container">
            <div className="row d-flex flex-column">
              <div className="col-md-10 mx-auto my-4">
                <table className="table table-hover">
                  <thead className="table-header bg-dark text-white">
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact, id) => (
                      <tr key={id}>
                        <td>{id + 1}</td>
                        <td>{contact.name}</td>
                        <td>{contact.email}</td>
                        <td>{contact.number}</td>
                        <td>
                          <Link
                            to={`/edit/${contact.id}`}
                            className=" mr-1 btn btn-sm btn-primary mr-1"
                            style={{ marginRight: "20px" }}
                          >
                            Edit
                          </Link>
                          <button
                            type="button"
                            onClick={() => dispatch(deleteContact(contact.id))}
                            className="btn btn-sm btn-dark ml-2"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <h1 className="text-center">You Have No Contacts</h1>
        )}
      </div>
    </div>
  );
};

export default Home;
