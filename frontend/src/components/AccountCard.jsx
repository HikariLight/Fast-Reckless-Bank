const AccountCard = ({ accountInfo }) => {
    return (
        <div className="rounded-md border border-purple-800 p-2">
            <label className="text-purple-800">ID:</label>{" "}
            {accountInfo.accountName} <br />
            <label className="text-purple-800">Balance:</label> $
            {accountInfo.balance.toFixed(2)}
        </div>
    )
}

export default AccountCard
