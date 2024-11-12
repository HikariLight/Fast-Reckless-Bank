import { useContext, useEffect } from "react"
import { AccountCard } from "./components"
import { GlobalContext } from "./App"

const AccountList = () => {
    const { accounts, fetchAccounts } = useContext(GlobalContext)

    useEffect(() => {
        fetchAccounts()
    }, [])

    return (
        <div className="mx-2 w-full rounded-md border border-purple-800 p-4">
            <h1 className="text-xl text-purple-800">Account List</h1>
            {accounts.length > 0 ? (
                <div className="flex flex-col space-y-2">
                    {accounts.map((account, index) => (
                        <AccountCard key={index} accountInfo={account} />
                    ))}
                </div>
            ) : (
                <p>No accounts found.</p>
            )}
        </div>
    )
}

export default AccountList
