import React, { useEffect, useState } from 'react'

import UsersList from '../components/UsersList'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { useHttpCLient } from '../../shared/hooks/http-hook'

const Users = () => {

    const { isLoading, error, sendRequest, clearError } = useHttpCLient()

    const [loadedUsers, setLoadedUsers] = useState()

    useEffect(() => {
        const fethUsers = async () => {
            try {
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/users')
                setLoadedUsers(responseData.users)
            } catch (err) { }
        }
        fethUsers()
    }, [sendRequest])

    return (
        <React.Fragment >
            <ErrorModal error={error} onClear={clearError} />
            {
                isLoading &&
                <div className='center'>
                    <LoadingSpinner />
                </div>
            }
            {
                !isLoading && loadedUsers && <UsersList items={loadedUsers} />
            }
        </React.Fragment >
    )
}

export default Users