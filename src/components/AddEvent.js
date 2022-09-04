import { Button } from "react-bootstrap";

function AddEvent({ onAdd, user }) {
  // if (!user) {
  //   return <Redirect to={"/signup"} />;
  // }
  return (
    <div className="add-event-page">
      <div className="add-event">
        <div>
          <h2>Create your event here!</h2>
        </div>
        <form onSubmit={(e) => onAdd(e, user)}>
          <div>
            <label>Event Name:</label>
            <input name="name" type="text" />
          </div>
          <div>
            <label>Date:</label>
            <input name="date" type="date" />
          </div>
          <div>
            <label>Location:</label>
            <input name="location" type="text" />
          </div>
          <div>
            <div>
              <label>Description:</label>
              <textarea name="description" rows="2" cols="40" />
            </div>
            <div>
              <label>Add an Image:</label>
              <input
                name="eventImage"
                type="file"
                accept="image/jpeg, image/png"
              />
            </div>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}

export default AddEvent;
