import { createContext } from "react";



export const UserContext = createContext();

const UserContextProvider = ({children}) => {
    console.log(`hello i am user context`);

    const userName = "ziad";
    return <UserContext.Provider value={userName}>
        {children}
    </UserContext.Provider>
}

export default UserContextProvider;