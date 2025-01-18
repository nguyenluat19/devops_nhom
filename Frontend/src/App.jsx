
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashBoard from "./Admin/DashBoard";
import TaoMoiSP from "./Admin/pagesAdmin/ProductPage/TaoMoiSP";
import ChinhSuaSP from "./Admin/pagesAdmin/ProductPage/ChinhSuaSP";
import XoaSP from "./Admin/pagesAdmin/ProductPage/XoaSP";
import XemThongTin from "./Admin/pagesAdmin/usersPage/XemThongTin";
import XoaND from "./Admin/pagesAdmin/usersPage/XoaND";
import XemSanPham from "./Admin/pagesAdmin/ProductPage/XemSanPham";
import BangDieuKhien from "./Admin/pagesAdmin/usersPage/BangDieuKhien";


function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<DashBoard />}>
            <Route index element={<BangDieuKhien />} />
            <Route path="xemsanPham" element={<XemSanPham />} />
            <Route path="taomoi" element={<TaoMoiSP />} />
            <Route path="chinhsua/:id" element={<ChinhSuaSP />} />
            <Route path="chinhsua" element={<ChinhSuaSP />} />
            <Route path="xoasanpham" element={<XoaSP />} />
            <Route path="xemthongtin" element={<XemThongTin />} />
            <Route path="xoanguoidung" element={<XoaND />} />

          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
