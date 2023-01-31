import { Link } from "react-router-dom"

export default function Sidebar() {
    return (
        <>
            <nav className="sidebar sidebar-offcanvas header-margin" id="sidebar">
                <ul className="nav">
                    <li className="nav-item">
                        <Link to="/adminmain/dashboard" className="nav-link">
                            <i className="icon-grid menu-icon"></i>
                            <span className="menu-title">Dashboard</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/adminmain/websitebuilder" className="nav-link">
                            <i className="icon-grid menu-icon"></i>
                            <span className="menu-title">Website Builder</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" data-toggle="collapse" href="#headers" aria-expanded="false" aria-controls="headers">
                            <i className="menu-icon icon-layout"></i>
                            <span className="menu-title">Headers</span>
                            <i className="menu-arrow"></i>
                        </a>
                        <div className="collapse" id="headers">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <Link to="/adminmain/headers" className="nav-link text-decoration-none">All Headers</Link></li>
                                <li className="nav-item"> <Link to="/adminmain/header-1" className="nav-link">Header 1</Link></li>
                                <li className="nav-item"> <Link to="/adminmain/header-2" className="nav-link">Header 2</Link></li>
                                <li className="nav-item"> <Link to="/adminmain/header-3" className="nav-link">Header 3</Link></li>
                                <li className="nav-item"> <Link to="/adminmain/header-4" className="nav-link">Header 4</Link></li>
                            </ul>
                        </div>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" data-toggle="collapse" href="#pages" aria-expanded="false" aria-controls="pages">
                            <i className="menu-icon mdi mdi-content-copy"></i>
                            <span className="menu-title">Pages</span>
                            <i className="menu-arrow"></i>
                        </a>
                        <div className="collapse" id="pages">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <Link to="/adminmain/allpages" className="nav-link">All pages</Link></li>
                                <li className="nav-item"> <Link to="/adminmain/pageadd" className="nav-link">Add new page</Link></li>
                            </ul>
                        </div>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" data-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
                            <i className="icon-head menu-icon"></i>
                            <span className="menu-title">User Pages</span>
                            <i className="menu-arrow"></i>
                        </a>
                        <div className="collapse" id="auth">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <Link to="/admin" className="nav-link">Login</Link></li>
                                <li className="nav-item"> <Link to="/signup" className="nav-link">Signup</Link></li>
                            </ul>
                        </div>
                    </li>

                </ul>
            </nav>
        </>
    )
}
