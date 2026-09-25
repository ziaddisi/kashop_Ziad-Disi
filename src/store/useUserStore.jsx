import React from "react";
import { create } from "zustand";


const useUserStore = create((set) => ({
    userName: 'ziad',
    
    changeName: () => {
        set((state) => ({
            userName:'ahmad'
        }))
    }
}))

export default useUserStore;