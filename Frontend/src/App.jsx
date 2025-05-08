import 'regenerator-runtime/runtime'
import { useRoutes } from 'react-router-dom'
import { routes } from './routes.jsx'
import { BottomNavBar } from './Components/BottomNavBar/BottomNavBar.jsx'

function App() {
  const element = useRoutes(routes)

  return (
    <div>
      {element}
      <BottomNavBar />
    </div>
  )
}

export default App
