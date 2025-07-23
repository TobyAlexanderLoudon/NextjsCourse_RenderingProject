import classes from './new-post.module.css';

export default function NewPost({toggleModalHandler, onAddPost}) {
  function submitHandler(event) {
    event.preventDefault();

    const postData = {
        body: event.target.body.value,
        author: event.target.name.value,
    };

    onAddPost(postData);
    toggleModalHandler();
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <p>
        <label htmlFor="body">Text</label>
        <textarea id="body" required rows={3} />
      </p>
      <p>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" required />
      </p>
      <p className={classes.actions}>
        <button type="button" onClick={toggleModalHandler}>
          Cancel
        </button>
        <button type="submit">Submit</button>
      </p>
    </form>
  );
}
