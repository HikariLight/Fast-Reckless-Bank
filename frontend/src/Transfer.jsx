import { useContext, useRef } from "react"
import { GlobalContext } from "./App"

const Transfer = () => {
    const apiURL = import.meta.env.VITE_serverURL
    const transferEndpoint = import.meta.env.VITE_transferEndpoint

    const fromAccountName = useRef()
    const toAccountName = useRef()
    const amount = useRef()

    const { fetchAccounts } = useContext(GlobalContext)

    const transfer = () => {
        if (
            !fromAccountName.current.value ||
            !toAccountName.current.value ||
            !amount.current.value
        ) {
            alert("Please fill in all fields appropriately.")
            return
        }

        if (amount.current.value < 0) {
            alert("Please give a positive amount value")
            return
        }

        const params = new URLSearchParams({
            fromAccountName: fromAccountName.current.value,
            toAccountName: toAccountName.current.value,
            amount: amount.current.value,
        })

        fetch(`${apiURL}${transferEndpoint}?${params}`, {
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
                return Promise.resolve()
            })
            .then((data) => {
                alert("Transfer successful!")
                fetchAccounts()
            })
            .catch((error) => {
                console.error("Error:", error)
                alert("Error: " + error.message)
            })
    }

    return (
        <div className="mx-2 flex flex-col items-center space-y-2 rounded-md bg-purple-800 p-4">
            <h1 className="text-xl text-white">Transfer</h1>

            <div className="grid grid-cols-3 items-center space-x-2">
                <label className="col-span-1 text-white">Transfer from:</label>
                <input
                    ref={fromAccountName}
                    className="col-span-2 rounded border border-purple-800 p-1"
                    type="text"
                    placeholder="Enter sending account"
                />
            </div>

            <div className="grid grid-cols-3 items-center space-x-2">
                <label className="col-span-1 text-white">Transfer to:</label>
                <input
                    ref={toAccountName}
                    className="col-span-2 rounded border border-purple-800 p-1"
                    type="text"
                    placeholder="Enter recipient account"
                />
            </div>

            <div className="grid grid-cols-3 items-center space-x-2">
                <label className="col-span-1 text-white">Amount:</label>
                <input
                    ref={amount}
                    className="col-span-2 rounded border border-purple-800 p-1"
                    type="number"
                    placeholder="Enter amount"
                />
            </div>

            <button
                className="rounded bg-white p-2 text-purple-800"
                onClick={transfer}
            >
                Transfer
            </button>
        </div>
    )
}

export default Transfer
