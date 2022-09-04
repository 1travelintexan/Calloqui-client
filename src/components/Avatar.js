import { Button } from "react-bootstrap";

function Avatar({ user, onAvatar }) {
  return (
    <div className="avatar-page">
      <div>
        <h2 className="avatar-page-h2">Choose your Avatar</h2>
      </div>
      <div>
        <form onSubmit={(e) => onAvatar(e, user._id)}>
          <div className="column">
            <input name="avatar" type="file" accept="image/jpeg, image/png" />

            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Avatar;
