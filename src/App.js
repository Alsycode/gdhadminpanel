import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import { TempleDataProvider } from "./components/context";
import Update  from "./scenes/updateform"
import Login from "./components/Loginpage/index"
import { Protector ,userData} from "./helpers";

function App() {
  const user = userData();
  const { jwt } = user;
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  console.log("token",jwt)
  return (
    <ColorModeContext.Provider value={colorMode}>
   
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app" style={{background:'linear-gradient(135deg,#000000,#fb8b36)',}}>
        {user ? (
            <>
              <Sidebar isSidebar={isSidebar} />
              <main
                className="content"
                style={{ flex: 1, overflow: "auto" }}
              >
                <Topbar setIsSidebar={setIsSidebar} />
                <TempleDataProvider>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/invoices" element={<Invoices />} />
                    <Route path="/form" element={<Form/>}/>
                    <Route path="/bar" element={<Bar />} />
                    <Route path="/pie" element={<Pie />} />
                    <Route path="/line" element={<Line />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/geography" element={<Geography />} />
                    <Route path="/updateform" element={<Update />} />
                   
                  </Routes>
                </TempleDataProvider>
              </main>
            </>
          ) : (
            <Login />
          )}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}



function AppWrapper() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default AppWrapper;