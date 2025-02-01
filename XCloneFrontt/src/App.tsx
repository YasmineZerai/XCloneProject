import { TimeLineContextProvider } from "./contexts/timeLineContext";
import { RegisterCard } from "./registeration/register";
import SideBar from "./sidebar/sideBar";
import StatusBar from "./statusBar/statusBar";
import Timeline from "./Timeline/timeline";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route
        path="/homepage"
        element={
          <div className="flex w-screen">
            <SideBar />
            <TimeLineContextProvider>
              <Timeline />
            </TimeLineContextProvider>
            <StatusBar />
          </div>
        }
      />
      <Route path="/register" element={<RegisterCard />} />
    </Routes>
  );
}

export default App;
