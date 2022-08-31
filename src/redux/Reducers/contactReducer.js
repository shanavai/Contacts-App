import { ADD_CONTACT, DELETE_CONTACT, EDIT_CONTACT } from "../Actions/Types";

const initialState = [];

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return [...state, action.payload];
    case EDIT_CONTACT:
      const contactUpdate = state.filter((contact) =>
        contact.id === action.payload.id
          ? Object.assign(contact, action.payload)
          : contact
      );
      state = contactUpdate;
      return state; 
    case DELETE_CONTACT:
      console.log('action.payload', action.payload)
      const filteredState = state.filter((contact)=>
        contact.id === action.payload ? null : contact
      )
      state = filteredState;
      return state; 

    default:
      return state;
  }
};

export default contactReducer;
