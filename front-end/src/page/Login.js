// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../components/style/login.css';
// import { getUserRole } from "../_services/account.services";

// function Login() {
//     const [UserName, setEmail] = useState('');
//     const [Password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         console.log(UserName, Password);
//         const response = await fetch('http://127.0.0.1:3001/users/signin', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ Username: UserName, Password: Password })
//         });
//         const data = await response.json();
//         if (data.token !== undefined) {
//             localStorage.setItem('token', data.token);
//             navigate('/home');
//             console.log(getUserRole());
//         }
//     }

//     return (
//         <div id="outer">
//             <div id="container">
//                 <div id="left">
//                     <h1 id="welcome">Welcome</h1>
//                     <p id="content">
//                         Welcome to Data center Inventory
//                     </p>
//                 </div>
//                 <div id="right">
//                     <h1 id="login">LogIn</h1>
//                     <br />
//                     <form onSubmit={handleSubmit}>
//                         <input
//                             type="text"
//                             id="email"
//                             className="client-info"
//                             value={UserName}
//                             onChange={(event) => setEmail(event.target.value)}
//                         />
//                         <label htmlFor="email" className='a'>Username</label>
//                         <input
//                             type="password"
//                             id="password"
//                             className="client-info"
//                             value={Password}
//                             onChange={(event) => setPassword(event.target.value)}
//                         />
//                         <label htmlFor="password" className='a'>Password</label>
//                         <input
//                             type="submit"
//                             id="submit"
//                             className="client-info"
//                             defaultValue="Submit"
//                         />
//                     </form>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Login;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../components/style/login.css';
// import { getUserRole } from "../_services/account.services";

// function Login() {
//     const [UserName, setEmail] = useState('');
//     const [Password, setPassword] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         console.log(UserName, Password);

//         if (!UserName || !Password) {
//             setErrorMessage('Please enter both username and password.');
//             return;
//         }

//         const response = await fetch('http://127.0.0.1:3001/users/signin', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ Username: UserName, Password: Password })
//         });

//         if (response.status === 404) {
//             setErrorMessage('User not found');
//         } else {
//             const data = await response.json();
//             if (data.token !== undefined) {
//                 localStorage.setItem('token', data.token);
//                 navigate('/home');
//                 console.log(getUserRole());
//             } else {
//                 setErrorMessage('Invalid username or password');
//             }
//         }
//     }

//     return (
//         <div id="outer">
//             <div id="container">
//                 <div id="left">
//                     <h1 id="welcome">Welcome</h1>
//                     <p id="content">
//                         Welcome to Data center Inventory
//                     </p>
//                 </div>
//                 <div id="right">
//                     <h1 id="login">LogIn</h1>
//                     <br />
//                     <form onSubmit={handleSubmit}>
//                         <input
//                             type="text"
//                             id="email"
//                             className="client-info"
//                             value={UserName}
//                             onChange={(event) => setEmail(event.target.value)}
//                             required
//                         />
//                         <label htmlFor="email" className='a'>Username</label>
//                         <input
//                             type="password"
//                             id="password"
//                             className="client-info"
//                             value={Password}
//                             onChange={(event) => setPassword(event.target.value)}
//                             required
//                         />
//                         <label htmlFor="password" className='a'>Password</label>
//                         <input
//                             type="submit"
//                             id="submit"
//                             className="client-info"
//                             defaultValue="Submit"
//                         />
//                         {errorMessage && <div className="error-message">{errorMessage}</div>}
//                     </form>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Login;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/style/login.css';
import { getUserRole } from "../_services/account.services";

function Login() {
    const [UserName, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(UserName, Password);

        if (!UserName || !Password) {
            setErrorMessage('Please enter both username and password.');
            return;
        }

        const response = await fetch('http://127.0.0.1:3001/users/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Username: UserName, Password: Password })
        });

        if (response.status === 404) {
            setErrorMessage('User not found');
        } else {
            const data = await response.json();
            if (data.token !== undefined) {
                localStorage.setItem('token', data.token);
                navigate('/home');
                console.log(getUserRole());
            } else {
                setErrorMessage('Invalid username or password');
            }
        }
    }

    return (
        <div id="outer">
            <div id="container">
                <div id="left">
                    <h1 id="welcome">Welcome</h1>
                    <p id="content">
                        Welcome to Data center Inventory
                    </p>
                </div>
                <div id="right">
                    <h1 id="login">LogIn</h1>
                    <br />
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            id="email"
                            className={`client-info ${errorMessage ? 'error' : ''}`}
                            value={UserName}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                        <label htmlFor="email" className='a'>Username</label>
                        <input
                            type="password"
                            id="password"
                            className={`client-info ${errorMessage ? 'error' : ''}`}
                            value={Password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                        <label htmlFor="password" className='a'>Password</label>
                        <input
                            type="submit"
                            id="submit"
                            className="client-info"
                            defaultValue="Submit"
                        />
                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
