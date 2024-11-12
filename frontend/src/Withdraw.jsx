import { useContext, useRef } from "react"
import { GlobalContext } from "./App"

const Withdraw = () => {
    const apiURL = import.meta.env.VITE_serverURL
    const withdrawEndpoint = import.meta.env.VITE_withdrawEndpoint

    const accountName = useRef()
    const amount = useRef()

    const { fetchAccounts } = useContext(GlobalContext)

    const withdrawAmount = () => {
        if (!accountName.current.value || !amount.current.value) {
            alert("Please fill in all fields appropriately.")
            return
        }

        if (amount.current.value < 0) {
            alert("Please give a positive amount value")
            return
        }

        const params = new URLSearchParams({
            accountName: accountName.current.value,
            amount: amount.current.value,
        })

        fetch(`${apiURL}${withdrawEndpoint}?${params}`, {
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
                alert("Withdrawal successful!")
                fetchAccounts()
            })
            .catch((error) => {
                console.error("Error:", error)
                alert("Error: " + error.message)
            })
    }

    return (
        <div className="mx-2 flex flex-col items-center space-y-2 rounded-md bg-purple-800 p-4">
            <h1 className="text-xl text-white">Withdrawal</h1>

            <div className="grid grid-cols-3 items-center space-x-2">
                <label className="col-span-1 text-white">Account name:</label>
                <input
                    ref={accountName}
                    className="col-span-2 rounded border border-purple-800 p-1"
                    type="text"
                    placeholder="Enter account name"
                />
            </div>

            <div className="grid grid-cols-3 items-center space-x-2">
                <label className="col-span-1 text-white">Deposit Amount:</label>
                <input
                    ref={amount}
                    className="col-span-2 rounded border border-purple-800 p-1"
                    type="number"
                    placeholder="Enter amount"
                />
            </div>

            <button
                className="rounded bg-white p-2 text-purple-800"
                onClick={withdrawAmount}
            >
                Withdraw
            </button>
        </div>
    )
}

export default Withdraw
