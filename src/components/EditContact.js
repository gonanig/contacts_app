import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const EditContact = () => {
  const [name, setName] = useState();
  const [lastname, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [pager, setPagerNumber] = useState("");
  const { id } = useParams();

  const contacts = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const currentContact = contacts.find(
    (contact) => contact.id === parseInt(id)
  );

  useEffect(() => {
    if (currentContact) {
      setName(currentContact.name);
      setLastName(currentContact.lastname);
      setAge(currentContact.age);
      setPagerNumber(currentContact.pager);
    }
  }, [currentContact]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const checkPager = contacts.find(
      (contact) =>
        contact.id !== parseInt(id) && contact.pager === parseInt(pager)
    );

    const checkPerson = contacts.find(
      (contact) =>
        contact.id !== parseInt(id) &&
        contact.name === name &&
        contact &&
        contact.lastname === lastname
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
      id: parseInt(id),
      name,
      lastname,
      age,
      pager,
    };
    dispatch({ type: "UPDATE_CONTACT", payload: data });
    toast.success("Contact updated successfully!");
    history.push("/");
  };

  return (
    <div className="container">
      {currentContact ? (
        <>
          <h1 className="display-3 my-5 text-center">Edit Contact {id}</h1>
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
                <div className="form-group mb-3">
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
                <div className="form-group mb-3">
                  <input
                    type="submit"
                    value="Update Contact"
                    className="btn  btn-dark "
                  />

                  <Link
                    to="/"
                    type="submit"
                    value="Add Contact"
                    className="btn btn-danger ms-3 "
                  >
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <h1 className="display-3 my-5 text-center">
          Contacts with id {id} not exists
        </h1>
      )}
    </div>
  );
};

export default EditContact;
