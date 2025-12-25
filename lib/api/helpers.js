"use server"

export async function research(query) {
    const response = await fetch("http://localhost:8080/api/research", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
    })

    const data = await response.json()

    return data
}