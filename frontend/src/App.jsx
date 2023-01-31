import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from './components/SignIn'
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Edit from "./components/Edit";
import DashboardHome from "./components/admin/DashboardHome";

import Login from "./components/admin/LoginSignup/Login";
import AdminMain from "./components/admin/AdminMain";
import IsLogin from "./components/protected/IsLogin";
import IsLogout from "./components/protected/IsLogout";
import Posts from "./components/Posts";
import CreatePost from "./components/CreatePost";
import AllPosts from "./components/AllPosts";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/home/createpost' element={<CreatePost />} />
          <Route path='/home/allposts' element={<AllPosts />} />
          <Route path='/home/posts/:id' element={<Posts />} />
          <Route path='/edit/:id' element={<Edit />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='*' element={<SignIn />} />

          <Route path="admin" element={<IsLogout Component={Login} />} />

          <Route path="adminmain" element={<IsLogin Component={AdminMain} />}>
            <Route path="dashboard" element={<DashboardHome />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
