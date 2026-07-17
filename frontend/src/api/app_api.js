export async function authorizedFetch(url, options = {}) {

    const token = localStorage.getItem("token");

    const response = await fetch(url, {
        ...options,

        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        throw new Error("Session expired");
    }

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    return response;
}


export async function get_all() {

    const resp = await authorizedFetch(
        "http://127.0.0.1:8000/notes/"
    );

    return await resp.json();
}

export async function make_note() {

    const resp = await authorizedFetch(
        "http://127.0.0.1:8000/notes/add",
        {
            method: "POST",
        }
    );

    return await resp.json();
}

export async function delete_note(id) {

    const resp = await authorizedFetch(
        `http://127.0.0.1:8000/notes/delete?id=${id}`,
        {
            method: "DELETE",
        }
    );

    return await resp.json();
}

export async function update_note(id, note) {

    const resp = await authorizedFetch(
        `http://127.0.0.1:8000/notes/update?id=${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
        }
    );

    return await resp.json();
}