import { useState, useCallback, useRef, useEffect } from 'react'

export const useHttpCLient = () => {

    const [isLoading, setIsloading] = useState(false)
    const [error, setError] = useState()

    const activeHttpRequests = useRef([])

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort())
        }
    }, [])

    const sendRequest = useCallback(
        async (url, method = 'GET', body = null, headers = {}) => {

            setIsloading(true)
            const httpAbortCtrl = new AbortController();
            activeHttpRequests.current.push(httpAbortCtrl)

            try {
                const response = await fetch(url, {
                    method: method,
                    body: body,
                    headers: headers,
                    signal: httpAbortCtrl.signal
                })

                const responseData = await response.json()
                activeHttpRequests.current = activeHttpRequests.current.filter(
                    reqCtrl => reqCtrl !== httpAbortCtrl
                )

                if (!response.ok) {
                    throw new Error(responseData.message)
                }

                setIsloading(false)

                return responseData
            } catch (err) {
                setError(err.message)

                setIsloading(false)

                throw err;
            }

        }, [])

    const clearError = () => {
        setError(null)
    }

    return { isLoading, error, sendRequest, clearError }
}