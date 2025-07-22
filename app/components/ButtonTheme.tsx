"use client"
import React from 'react'
import { useTheme } from "next-themes";


const ButtonTheme = () => {
    const { systemTheme, theme, setTheme } = useTheme();

    const currentTheme = theme === 'system' ? systemTheme : theme;

    return (
        <button
            onClick={() => theme == "dark"? setTheme('light'): setTheme("dark")}
            className='
                bg-gray-800 
                dark:bg-gray-50 
                hover:bg-gray-600 
                dark:hover:bg-gray-300 
                transition-all 
                duration-100 
                text-white 
                dark:text-gray-800 
                flex
                justify-center
                rounded-md
                px-3
                py-2
                text-sm
                font-semibold
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-2
            '
        >
            Changer le thème
        </button>
    )
}

export default ButtonTheme;