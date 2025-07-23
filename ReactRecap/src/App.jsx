import { useState } from 'react';
import MainHeader from './components/main-header';
import PostList from './components/post-list';

export default function App() {
  const [modalIsVisible, setmodalIsVisible] = useState(false);

  function toggleModalHandler() {
    setmodalIsVisible(!modalIsVisible);
  }

  return (
    <>
      <MainHeader toggleModalHandler={toggleModalHandler} />
      <main>
        <PostList
          modalIsVisible={modalIsVisible}
          toggleModalHandler={toggleModalHandler}
        />
      </main>
    </>
  );
}
