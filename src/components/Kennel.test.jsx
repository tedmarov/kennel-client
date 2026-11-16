import React from "react"
import { cleanup, fireEvent, render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { afterEach, expect, it, vi } from "vitest"
import { Kennel } from "./Kennel"

afterEach(() => {
    cleanup()
    localStorage.clear()
    vi.unstubAllGlobals()
})

it("redirects signed-out deep links to login", () => {
    const { container } = render(
        <MemoryRouter initialEntries={["/animals/1"]}>
            <Kennel />
        </MemoryRouter>
    )

    expect(container.querySelector("h2")?.textContent).toBe("Please sign in")
    expect(container.querySelector(".navbar")).toBeNull()
})

it("navigates from login to registration", () => {
    const { container } = render(
        <MemoryRouter initialEntries={["/login"]}>
            <Kennel />
        </MemoryRouter>
    )

    fireEvent.click(container.querySelector('a[href="/register"]'))

    expect(container.querySelector("h1")?.textContent).toBe("Please Register for NSS Kennels")
    expect(container.querySelectorAll('input[type="password"]')).toHaveLength(2)
})

it("renders the signed-in home page and loads its existing API endpoints", async () => {
    localStorage.setItem("kennel_customer", "1")
    const fetchMock = vi.fn().mockImplementation(async () => ({
        json: async () => []
    }))
    vi.stubGlobal("fetch", fetchMock)

    const { container } = render(
        <MemoryRouter initialEntries={["/"]}>
            <Kennel />
        </MemoryRouter>
    )

    await vi.waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(3))

    expect(container.querySelector("h1")?.textContent).toBe("Locations")
    expect(container.querySelector(".navbar")).toBeInTheDocument()
    expect(fetchMock.mock.calls.map(([url]) => url)).toEqual([
        "http://localhost:8088/locations",
        "http://localhost:8088/employees",
        "http://localhost:8088/animals"
    ])
})
