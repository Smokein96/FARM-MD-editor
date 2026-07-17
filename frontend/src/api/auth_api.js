export async function setup(username, password){
    const resp = await fetch(
        "https://md-x-api.onrender.com/auth/setup",

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

        throw {
            status_code : resp.status,
            message : error.detail
        }
    }
    
    return await resp.json();
}

export async function login(username, password) {

    const form = new URLSearchParams();
    form.append("username", username);
    form.append("password", password);

    const resp = await fetch(
        "https://md-x-api.onrender.com/auth/login"
    ,{
        method : "POST",
        body : form
    })
    
    if (!resp.ok){
        const error = await resp.json();
        throw {
            status_code : resp.status,
            message : error.detail
        }
    }

    return await resp.json()
}