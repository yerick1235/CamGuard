import { MainPage } from "./Pages/MainPage/MainPage"
import { Feed } from "./Pages/Feed/Feed"
import { Emergency } from "./Pages/Emergency/Emergency"

export const routes = [
    {path:"", element: <MainPage/>},
    {path:"*", element: <MainPage/>},
    {path:'feed', element: <Feed/>},
    {path:'emergency', element: <Emergency/>}
]