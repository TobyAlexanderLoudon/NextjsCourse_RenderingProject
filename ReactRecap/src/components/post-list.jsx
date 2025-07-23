import { useState } from 'react';
import Modal from './modal';
import NewPost from './new-post';
import Post from './post';
import classes from './post-list.module.css';

export default function PostList({ modalIsVisible, toggleModalHandler }) {
  const [posts, setPosts] = useState([]);

  function addPostHandler(postData) {
    setPosts((existing) => [postData, ...existing]);
  }

  return (
    <>
      {modalIsVisible && (
        <Modal toggleModalHandler={toggleModalHandler}>
          <NewPost
            toggleModalHandler={toggleModalHandler}
            onAddPost={addPostHandler}
          />
        </Modal>
      )}

      {posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post) => (
            <Post key={post.body} author={post.author} body={post.body} />
          ))}
        </ul>
      )}

      {posts.length == 0 && (
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h2>There are no posts yet.</h2>
          <p>Click 'New Post' to add some.</p>
        </div>
      )}
    </>
  );
}
