import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Authcontext from '../Context/Authcontext';
export const LoginPage = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const authctx = useContext(Authcontext);

  const navigater = useNavigate();

  function navigaters (){
    navigater('/Story');
  }
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: Add validation

    setIsLoading(true);
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCfddi8_nogytvpSNkU1Ug2-q5QwbMLQCc';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication failed!';
            // if (data && data.error && data.error.message) {
            //   errorMessage = data.error.message;
            // }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        authctx.login(data.idToken);
    
      })
      .catch((err) => {
        alert(err.message);
      });
  };



  return (
    <section >

      <form onSubmit={submitHandler}>
        <div className="">
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className=" ">
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className=" ">
         
          {isLoading && <p>Sending request...</p>}
          <button type='submit' onClick={navigaters }>Submit</button>

        </div>
      </form>
    </section>
  );
};

