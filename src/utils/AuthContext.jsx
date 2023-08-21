/* eslint-disable react/prop-types */
import { createContext,useState,useContext, useEffect } from "react";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
   
    const [user,setUser] = useState(false)
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate()


    useEffect(() => {
        getUserOnLoad()
    },[])


    const getUserOnLoad = async () => {

        try{
            const accountDetails = await account.get()
            setUser(accountDetails)
            console.log("user",user.name)
        }
        catch(error) {
            console.log(error)
        }
        setUser(false)
    }

    const handleUserLogout = async () => {
        await account.deleteSession('current')
        setLoading(false)
          
    }


    const handleUserLogin = async (e , credentials) => {
        e.preventDefault()

        try {
            // eslint-disable-next-line no-unused-vars
            const response = await account.createEmailSession(credentials.email,credentials.password)
            const accountDetails = await account.get()
            setUser(accountDetails)
            navigate('/')
        }
        catch(error) {
            console.log(error)
        }
    }

    const handleUserRegister = async (e , credentials) => {
        e.preventDefault()

        if(credentials.password1 !== credentials.password2) {
            return alert('Passwords do not match')
        }

        try {
            // eslint-disable-next-line no-unused-vars
            const response = await account.create(
            ID.unique(),
            credentials.name,
            credentials.email,
            credentials.password1)
            await account.createEmailSession(credentials.email,credentials.password)
            const accountDetails = await account.get()
            setUser(accountDetails)
            navigate('/')
        }
        catch(error) {
            console.log(error)
        }
    }

    const contextData = {
        user,
        handleUserLogin,
        handleUserLogout,
        handleUserRegister
    }

    return <AuthContext.Provider value={contextData}>
        {loading ? <h1 className="loading">Loading...</h1> : children}

    </AuthContext.Provider>

}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)

export default AuthContext