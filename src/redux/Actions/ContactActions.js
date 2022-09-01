import { ADD_CONTACT, DELETE_CONTACT, EDIT_CONTACT } from "./Types";

const addContact = (data) => ({
  type: ADD_CONTACT,
  payload: data,
});

export const editContact = (data) => ({
  type: EDIT_CONTACT,
  payload: data,
});

export const deleteContact = (id) => ({
  type: DELETE_CONTACT,
  payload: id,
});

export default addContact;
