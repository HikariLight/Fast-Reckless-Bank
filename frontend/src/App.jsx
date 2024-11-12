import AccountList from "./AccountsList"
import Deposit from "./Deposit"
import Withdraw from "./Withdraw"
import AccountCreation from "./AccountCreation"
import Transfer from "./Transfer"
import { useState, createContext } from "react"

const GlobalContext = createContext()

const App = () => {
    const apiURL = import.meta.env.VITE_serverURL
    const accountsEndpoint = import.meta.env.VITE_accountsEndpoint

    const [accounts, setAccounts] = useState([])

    const fetchAccounts = async () => {
        try {
            const response = await fetch(`${apiURL}${accountsEndpoint}`)

            if (!response.ok) {
                throw new Error("Failed to fetch accounts")
            }
            const data = await response.json()
            setAccounts(data)
        } catch (err) {
            alert(err)
        }
    }

    return (
        <GlobalContext.Provider value={{ accounts, fetchAccounts }}>
            <div className="flex flex-col space-y-4">
                <h1 className="my-2 text-center text-2xl text-purple-800">
                    Welcome to Fast & Reckless Bank!
                </h1>

                <AccountList />

                <AccountCreation />

                <Deposit />

                <Withdraw />

                <Transfer />
            </div>
        </GlobalContext.Provider>
    )
}

export { App, GlobalContext }
