import './custom.css';
import {Layout} from "./components/Layout";
import AppRoutes from "./AppRoutes";
import {Route, Routes} from "react-router-dom";

export default function App() {    
    return(
        <main>
            <Layout>
                <Routes>
                    {AppRoutes.map((route, index) => {
                        const { element, ...rest } = route;
                        return <Route key={index} {...rest} element={element} />;
                    })}
                </Routes>
            </Layout>
        </main>
    )
}

