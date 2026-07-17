export async function authorizedFetch(suffix, options = {}) {

    const url = `https://md-x-api.onrender.com/${suffix}`

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
        window.location.href = "/error";

    }

    if (!response.ok) {

        const error = await response.json();
        throw {
            status_code : response.status,
            message : error.detail
        };
    }

    return response;
}


export async function get_all() {

    const resp = await authorizedFetch(
        "notes/"
    );

    return await resp.json();
}

export async function make_note() {

    const resp = await authorizedFetch(
        "notes/add",
        {
            method: "POST",
        }
    );

    return await resp.json();
}

export async function delete_note(id) {

    const resp = await authorizedFetch(
        `notes/delete?id=${id}`,
        {
            method: "DELETE",
        }
    );

    return await resp.json();
}

export async function update_note(id, note) {

    const resp = await authorizedFetch(
        `notes/update?id=${id}`,
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