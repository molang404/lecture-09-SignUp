import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Result from "./pages/Result";
import GlobalStyle from "./GlobalStyle";

function App() {
    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Home />} />
                    <Route path={"/result"} element={<Result />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
