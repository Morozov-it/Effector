import React from 'react'
import { Spinner } from '@chakra-ui/react'

const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const Spiner = () => {
    return (
        <div style={style}>
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />
        </div>
    )
}

export default Spiner