import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { useCartContext } from '../contexts/CartContext'
import FormatPrice from '../Helpers/FormatPrice'
import { Td, Tr } from 'react-super-responsive-table'
import { Link } from 'react-router-dom'

export default function CartItem({ productId, titleName, productImage, price }) {

    const { removeItem } = useCartContext()


    return (
        <>
            <Tr className='mt-2 py-3'>
                <Td className=''>
                    <Link to={`/singalproduct/${productId}`}>
                        <img style={{ maxWidth: '5rem', height: '3rem', marginBottom: '10px' }} src={productImage} alt={productId} />
                    </Link>
                </Td>

                <Td className='mb-3'>
                    <Link to={`/singalproduct/${productId}`} className='link'>{titleName}</Link>
                </Td>

                <Td className='mb-3'>{productId}</Td>

                <Td className='mb-3'>{<FormatPrice price={price} />}</Td>

                <Td><FaTrash className='text-danger ms-4' onClick={() => removeItem(productId)} /></Td>
            </Tr>
        </>
    )
}
