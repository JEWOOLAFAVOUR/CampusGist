import { DarkTheme, DefaultTheme } from "@react-navigation/native"

export default {
    asyncStorageKey: "NewsApp001",
    // BASE_URL: 'http://192.168.43.192:4000/api/v1/',
    BASE_URL: 'https://campus-gist.onrender.com/api/v1/',
    MyLightTheme: {
        ...DefaultTheme,
        dark: false,
        colors: {
            ...DefaultTheme.colors,
            primary: '#062743',
            secondary: '#182952',

            // colors
            black: '#1e1f20',
            white: '#ffffff',

            lightGray: '#f5f5f6',
            lightGray2: '#f6f6f7',
            lightGray3: '#efeff1',
            lightGray4: '#f8f8f9',
            lightGray5: '#9ea9b3',
        }
    },
    MyDarkTheme: {
        ...DarkTheme,
        dark: true,
        colors: {
            ...DarkTheme.colors,
            primary: '#062743',
            secondary: '#182952',
            card: '#1f1f1f',
            black: '#1e1f20',
            white: '#ffffff',

            lightGray: '#f5f5f6',
            lightGray2: '#f6f6f7',
            lightGray3: '#efeff1',
            lightGray4: '#f8f8f9',
            lightGray5: '#9ea9b3',
        }
    }
}
