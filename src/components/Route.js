import { useEffect, useState } from "react"

export default function Route({path , children, component}) {

    const [currentPath, setCurrentPath] = useState(window.location.pathname)


    // truncate URL path in case of params
    for (let i = 0; i < currentPath.length; i++) {

        if (currentPath.charAt(i) == '?') {
            setCurrentPath( currentPath.substring(0,i) )
            break
        }
    }

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