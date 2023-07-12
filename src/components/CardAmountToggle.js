import React from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'

export default function CardAmountToggle() {

    const [amount, setAmount] = useState(1)

    const setIncreased = () => {
        setAmount(amount + 1)
    }

    const setDecreased = () => {
        amount > 1 ? setAmount(amount - 1) : setAmount(1)
    }

    return (
        <>
            <div className='d-flex justify-content-around align-items-center' style={{ width: '12rem' }}>
                <span><button className='border-0 bg-white' onClick={() => { setDecreased() }}>
                    <FaMinus />
                </button></span>

                <span>{amount}</span>

                <span><button className='border-0 bg-white' onClick={setIncreased}>
                    <FaPlus />
                </button></span>
            </div>
        </>
    )
}
