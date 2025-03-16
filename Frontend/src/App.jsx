



import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import DashBoard from "./Admin/DashBoard";
import TaoMoiSP from "./Admin/pagesAdmin/ProductPage/TaoMoiSP";
import ChinhSuaSP from "./Admin/pagesAdmin/ProductPage/ChinhSuaSP";
import XoaSP from "./Admin/pagesAdmin/ProductPage/XoaSP";
import XemThongTin from "./Admin/pagesAdmin/usersPage/XemThongTin";
import XoaND from "./Admin/pagesAdmin/usersPage/XoaND";
import XemSanPham from "./Admin/pagesAdmin/ProductPage/XemSanPham";
import BangDieuKhien from "./Admin/pagesAdmin/usersPage/BangDieuKhien";
import Profile from "./Admin/pagesAdmin/profile/Profile";
import NotFoundPage from "./Admin/NotFoundPage";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import PageNotFound from "./Pages/PageNotFoud/PageNotFound"
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import DetailPage from "./Pages/DetailPage";
import CartPage from "./Pages/CartPage";
import ProfileUser from "./Pages/Profile";
import UpdateProfile from "./Pages/updateProfile";
import CThanhToanPage from "./Pages/CThanhToanPage";
import SearchResults from "./Pages/SearchHome";
import CBDatHang from "./Pages/CBDatHang";
import DonHang from "./Pages/DonHang";
import XemComment from './Admin/pagesAdmin/reviews/XemComment'
import XoaComment from "./Admin/pagesAdmin/reviews/XoaComment";
import ReplyComment from "./Pages/replyComment";
import Reviews from "./Pages/ThanhToan";
// import AllComment from "./Pages/AllComment";


// import SearchHome from "./Pages/SearchHome";



function App() {
  return (

    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        {/* <Route path='/search' element={<SearchHome />} /> */}
        <Route path='/profile-user' element={<ProfileUser />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/thanh-toan" element={<CThanhToanPage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/cbDatHang" element={<CBDatHang />} />
        <Route path="/donhang" element={<DonHang />} />
        <Route path="/rep-comment" element={<ReplyComment />} />
        <Route path="/getAll-comemnt" element={<Reviews />} />


        <Route path="/dashboard" element={<DashBoard />}>
          <Route index element={<BangDieuKhien />} />
          <Route path="xemsanPham" element={<XemSanPham />} />
          <Route path="taomoi" element={<TaoMoiSP />} />
          <Route path="chinhsua/:id" element={<ChinhSuaSP />} />
          <Route path="chinhsua" element={<ChinhSuaSP />} />
          <Route path="xoasanpham" element={<XoaSP />} />
          <Route path="xemthongtin" element={<XemThongTin />} />
          <Route path="xoanguoidung" element={<XoaND />} />
          <Route path="xemComment" element={<XemComment />} />
          <Route path="xoaComment" element={<XoaComment />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>

  );
}

export default App;