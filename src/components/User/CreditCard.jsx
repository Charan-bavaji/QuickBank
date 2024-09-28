import React from 'react'

const CreditCard = () => {
    return (
        <div className="w-[20rem]">
            <div className='max-w-xs p-4 rounded-lg shadow-lg  bg-gradient-to-r from-purple-700  to-blue-500 text-white'>

                <div className="flex justify-between">
                    <div>
                        <h2 className="text-lg font-semibold">Home Account</h2>
                        <p className="text-sm">(GBP)</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm">Spend Limit</p>
                        <p className="text-lg font-bold">€5000</p>
                    </div>
                </div>

                <div className="mt-4 text-xl font-bold">
                    •••• •••• •••• 4567
                </div>

                <div className="mt-4 flex justify-between text-sm">
                    <div>
                        <p>Card Holder Name</p>
                        <p className="font-bold">Brott Smith</p>
                    </div>
                    <div>
                        <p>CVV</p>
                        <p className="font-bold">789</p>
                    </div>
                    <div>
                        <p>Expiry Date</p>
                        <p className="font-bold">05/2021</p>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-between">
                <button className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400     text-white rounded-md">Transfer Funds</button>
                <button className="px-4 py-2 bg-inherit  text-blue-800  rounded-md font-bold border-2 border-blue-800 text-sm hover:bg-blue-600 hover:text-white">Add Card</button>
            </div>
        </div>
    )
}

export default CreditCard
