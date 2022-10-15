import { useEffect, useState } from "react"

export default function Route({path , children, component}) {

    const [currentPath, setCurrentPath] = useState(window.location.pathname)

    useEffect(() => {

        const onLocationChange = () => {
            setCurrentPath(window.location.pathname)
        }

        window.addEventListener('popstate', onLocationChange)

        return () => {
            window.removeEventListener('popstate' , onLocationChange)
        }
    }, [])

    return currentPath === path ? component : null
}