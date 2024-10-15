import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from '../layout/Header/Header';
import { Footer } from '../layout/Footer/Footer';
import { Home } from '../Home/Home';
import App from '../../App';
import { Blog } from '../Customer/Blog/Blog';
import { Detail } from '../Customer/BlogDetail/Detail/Detail';
import { Login } from '../Customer/Login/Login';
import { Information } from '../Customer/Update/Information';
import { Product } from '../Customer/Product/Product';
import { MenuManager } from '../layout/MenuManager/Menu';
import { PrivateRoute } from '../Context/Private.Route';
import { Add } from '../Manage/Add/Add';
import { AddAlert } from '@mui/icons-material';
export const AppRouter: React.FC = () => {
    return (
        <Router>
            <App>
                <Routes>
                    {/* customer */}
                    <Route path="/" element={<Home />} />
                    <Route path="/blog" element={<Blog />}> </Route>
                    <Route path="/blog/detail/:id" element={<Detail />}></Route>
                    <Route path="/login" element={<Login />}> </Route>
                    <Route
                        path="/information"
                        element={
                            <PrivateRoute requiredLevel={0} element={<Information />}/>
                        }
                    />
                    <Route
                        path="/Product"
                        element={
                            <PrivateRoute requiredLevel={1} element={<Product />} />
                        }
                    />

                    {/* admin */}
                    <Route
                        path="/manager"
                        element={
                            <PrivateRoute requiredLevel={0} element={<MenuManager />} />
                        }
                    />
                    <Route
                        path="/add"
                        element={
                            <PrivateRoute requiredLevel={0} element={<Add />} />
                        }
                    />
                </Routes>
            </App>
        </Router>
    )
}