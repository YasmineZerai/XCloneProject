
import { TimeLineContextProvider } from './contexts/timeLineContext'
import SideBar from './sidebar/sideBar'
import StatusBar from './statusBar/statusBar'
import Timeline from './Timeline/timeline'
function App() {
  return (
    <div className='flex w-screen'>
    <SideBar/>
    <TimeLineContextProvider>
    <Timeline/>
    </TimeLineContextProvider>
    <StatusBar/>
    </div>
    
     
    
  )
}

export default App
