import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { updateUserDBEntry } from "../../../firebaseFunctions";
import { useFirebaseAuth } from "../../context/AuthContext";

function ShelfCreationForm({ handleToast, handleCloseModal, refreshShelves }) {
  const { user } = useFirebaseAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [shelfForm, setShelfForm] = useState({
    name: "",
    description: "",
    id: uuidv4(),
    protected: false,
    games: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShelfForm(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Trim all form values and set those values
    setShelfForm(prev => ({
      ...prev,
      name: prev.name.trim(),
      description: prev.description.trim(),
    }));

    const updatedShelves = {
      shelves: [...user.shelves, shelfForm]
    };

    try {
      await updateUserDBEntry(user, updatedShelves);
      handleToast("success", "Shelf created.");
      refreshShelves(updatedShelves);
      handleCloseModal();
    } catch (e) {
      setErrorMessage(e.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form__group">
        <label htmlFor="name">Name*</label>
        <input
          required
          type="text"
          placeholder="My Shelf"
          id="name"
          name="name"
          onChange={handleInputChange}
        />
      </div>
      <div className="form__group">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          placeholder="A shelf for my games"
          id="description"
          name="description"
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Create Shelf</button>
      {errorMessage.length > 0 && 
        <div className="form__error">
          <p>{errorMessage}</p>
        </div>
      }
    </form>
  )
}

export default ShelfCreationForm;