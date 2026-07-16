export async function setup(username, password){
    const resp = await fetch(
        "http://127.0.0.1:8000/auth/setup",

        {
            method : "POST",
            headers: {
                "Content-Type": "application/json"
            },
             body : JSON.stringify({
                username,
                password
            })
        },
    );

    if (!resp.ok){
        const error = await resp.json();

        throw new Error(error.detail);
    }
    
    return await resp.json();
}

export async function login(username, password) {

    const form = new URLSearchParams();
    form.append("username", username);
    form.append("password", password);

    const resp = await fetch(
        "http://127.0.0.1:8000/auth/login"
    ,{
        method : "POST",
        body : form
    })
    
    if (!resp.ok){
        const error = await resp.json();
        throw new Error(error.detail)
    }

    return await resp.json()
}