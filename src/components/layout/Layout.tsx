import React, {FC} from 'react';
import './layout.scss'
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Sidebar from "../sidebar/Sidebar"

interface LayoutProps{
    children: React.ReactChild
}

const Layout: FC<LayoutProps> = ({children}) => {

    return (
        <div className={'layout'}>
            <Navbar/>
            <div className={'main'}>
                <div className={'mainWrapper'}>
                    <Sidebar/>
                    <div className={'children'}>
                      {children}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Layout;
