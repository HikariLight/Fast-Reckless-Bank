import { useContext, useRef } from "react"
import { GlobalContext } from "./App"

const AccountCreation = () => {
    const apiURL = import.meta.env.VITE_serverURL
    const accountsCreationEndpoint = import.meta.env
        .VITE_accountCreationEndpoint

    const accountName = useRef()

    const { fetchAccounts } = useContext(GlobalContext)

    const createAccount = () => {
        if (!accountName.current.value) {
            alert("Please fill in all fields.")
            return
        }

        const params = new URLSearchParams({
            accountName: accountName.current.value,
        })

        fetch(`${apiURL}${accountsCreationEndpoint}?${params}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((errorData) => {
                        throw new Error(
                            errorData.message || "An error occurred",
                        )
                    })
                }
                return response.json()
            })
            .then((data) => {
                alert("Account creation successful!")
                console.log("Success:", data)
                fetchAccounts()
            })
            .catch((error) => {
                console.error("Error:", error)
                alert("Error: " + error.message)
            })
    }

    return (
        <div className="mx-2 flex flex-col items-center space-y-2 rounded-md bg-purple-800 p-4">
            <h1 className="text-xl text-white">Create an account</h1>

            <div className="flex items-center justify-center space-x-2">
                <label className="text-white">Account name:</label>
                <input
                    ref={accountName}
                    className="rounded border border-purple-800 p-1"
                    type="text"
                    placeholder="Enter account name"
                />
            </div>

            <button
                className="rounded bg-white p-2 text-purple-800"
                onClick={createAccount}
            >
                Create Account
            </button>
        </div>
    )
}

export default AccountCreation
