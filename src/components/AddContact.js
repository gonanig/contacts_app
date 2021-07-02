import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const AddContact = () => {
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [pager, setPagerNumber] = useState("");

  const contacts = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    const checkPager = contacts.find(
      (contact) => contact.pager === parseInt(pager)
    );

    const checkPerson = contacts.find(
      (contact) =>
        contact.name === name && contact && contact.lastname === lastname
    );

    if (checkPager) {
      return toast.error("This pager number already exists");
    }
    if (!name || !lastname || !age || !pager) {
      return toast.warning("Please fill all fields");
    }
    if (checkPerson) {
      return toast.error("This person  already exists");
    }

    const data = {
      id: contacts[contacts.length - 1].id + 1,
      name,
      lastname,
      age,
      pager,
    };
    dispatch({ type: "ADD_CONTACT", payload: data });
    toast.success("Contact added successfully!");
    history.push("/");
  };

  return (
    <div className="container">
      <h1 className="display-3 my-5 text-center">Add Contact</h1>
      <div className="row">
        <div className="col-md-6 shadow mx-auto p-5">
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <input
                type="text"
                placeholder="Name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group mb-3 ">
              <input
                type="text"
                placeholder="Last Name"
                className="form-control"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="number"
                placeholder="Age"
                className="form-control"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="number"
                placeholder="Pager"
                className="form-control"
                value={pager}
                onChange={(e) => setPagerNumber(e.target.value)}
              />
            </div>
            <div className="form-group mb-3 d-grid gap-2 ">
              <input
                type="submit"
                value="Add Contact"
                className="btn btn-primary  btn-dark"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddContact;
