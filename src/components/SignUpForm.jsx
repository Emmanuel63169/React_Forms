import { useState } from 'react'

export default function SignUpForm({token, setToken}) {
                                    //    ^  deconstructing token from props
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    async function handleSubmit(event, username, password) {
        event.preventDefault();
        console.log('Submit Button Works!!')

        try{ 
            // double check this
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username, 
                    password, 
                })
            })
            
            const result = await response.json();
            console.log(result);

            setToken(result.token);  // passing the token propperty to setToken
        } catch (error) {
                setError(error.message)
            }
    }

    return (
    <>
        <h2 class="title1">Sign Up!</h2>
        {error && <p>{error}</p>}
    <form onSubmit={(e)=>handleSubmit(e,username,password)}>
        <label class="username_box">
            Username: <input value={username} onChange={(e) => setUsername(e.target.value)}/>
        </label>
        <label class="password_box">
            Password: <input value={password} onChange={(e) => setPassword(e.target.value)}/>
        </label>
        <button>Submit</button>
    </form>
    </>
    );
}