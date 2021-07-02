const initialState = [
  { id: 0, name: "Carla", lastname: "Espinosa", age: 28, pager: 945455 },

  {
    id: 1,
    name: "Perry",
    lastname: "Cox",
    age: 40,
    pager: 955654,
  },
  {
    id: 2,
    name: "Robert",
    lastname: "Celso",
    age: 58,
    pager: 128215,
  },
  {
    id: 3,
    name: "John",
    lastname: "Dorian",
    age: 27,
    pager: 926545,
  },
];

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      state = [...state, action.payload];
      return state;
    case "UPDATE_CONTACT":
      const updateState = state.map((contact) =>
        contact.id === action.payload.id ? action.payload : contact
      );
      state = updateState;
      return state;
    case "DELETE_CONTACT":
      const filterContacts = state.filter((contact) =>
        contact.id === action.payload ? null : contact
      );
      state = filterContacts;
      return state;
    default:
      return state;
  }
};

export default contactReducer;
