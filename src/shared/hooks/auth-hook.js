import { useState, useEffect, useCallback } from 'react'

let logoutTimer

export const useAuth = () => {

    const [token, setToken] = useState(null)
    const [tokenExpirationDate, setTokenExpirationDate] = useState()
    const [userId, setUserId] = useState(false)

    const login = useCallback((uid, token, expirationDate) => {
        setToken(token)
        setUserId(uid)
        const tokenExpirationDateTemp = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60)
        setTokenExpirationDate(tokenExpirationDateTemp)
        localStorage.setItem(
            'userData',
            JSON.stringify({
                userId: uid,
                token: token,
                expiration: tokenExpirationDateTemp.toISOString()
            })
        )
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setTokenExpirationDate(null)
        localStorage.removeItem('userData')
    }, [])

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'))
        if (
            storedData &&
            storedData.token &&
            new Date(storedData.expiration) > new Date()
        ) {
            login(storedData.userId, storedData.token, new Date(storedData.expiration))
        }
    }, [login])

    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime = tokenExpirationDate.getTime() - new Date().getTime()
            logoutTimer = setTimeout(logout, remainingTime)
        } else {
            clearTimeout(logoutTimer)
        }
    }, [token, logout, tokenExpirationDate])

    return { userId, token, login, logout }
}