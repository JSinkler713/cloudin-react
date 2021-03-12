import logo from './logo.svg';
import {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [photo, setPhoto] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (e)=> {
    e.preventDefault()
    console.log('submit')
    let form_data = new FormData();
    form_data.append('image', photo, 'image');
    axios.post('http://localhost:8000/images', form_data, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
        .then(res => {
          console.log(res.data);
          setUrl(res.data.url)
        })
        .catch(err => console.log(err))
    };
  
  const handleSubmitFetch = (e)=> {
    e.preventDefault()
    console.log('submit')
    let form_data = new FormData();
    form_data.append('image', photo, 'image');
    const options = {
      method: 'POST',
      body: form_data,
      // Counterintuitively don't use this with fetch
      // boundary not found with this header 
      /*
      headers: {
        'Content-Type': 'multipart/form-data',
      }
      */
    }
    fetch('http://localhost:8000/images/multer', options)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setUrl(data.url)
        })
        .catch(err => console.log(err))
    };

  return (
    <div className="App">
      <form onSubmit={handleSubmitFetch}>
        <input type='file' onChange={(event)=> {
          setPhoto(event.target.files[0])
        }} />
        <button type='submit'>Submit</button>
      </form>
      <p>Hey there</p>
      { url ? <img style={{minWidth:'200px'}} src={`${url}`} alt='go cloudinary' />: 'no image yet'}
      <p>Yup</p>
    </div>
  );
}

export default App;
