// // import { useSearch } from "../context/search"
// // import Layout from "../components/layout/layout"
// // import { LuEye } from "react-icons/lu"
// // import { FaPlus } from "react-icons/fa"
// import Layout from "../components/Layout/Layout"
// import { useSearch } from "../context/search"


// const SearchHome = () => {
//     const [values] = useSearch()
//     return (
//         <Layout title={'search'}>
//             <div className="container">
//                 <div className="text-center">
//                     <h3>Search results</h3>
//                     <h6>{values?.results.length < 1 ? "not found" : `Found ${values?.results.length}`}</h6>
//                     <div className="d-flex flex-wrap mt-4">
//                         {values?.results.map((product, index) => (
//                             <div key={index} className="card m-2" id='cardHome'>
//                                 <img
//                                     src={product.image}
//                                     className="card-img-top"
//                                     alt={product.name}
//                                 />
//                                 <div className="card-body">
//                                     <div className="d-flex justify-content-between">
//                                         <h6 className="card-title">{product.name}</h6>

//                                     </div>
//                                     <p className="card-text">{product.description.substring(0, 23)} ...</p>
//                                     <p>{product.price} đ</p>
//                                     {/* <div className="flexButtonHome">
//                                         <button className="buttonHomeA"><LuEye /> Detail</button>
//                                         <button className="buttonHomeA"><FaPlus /> Cart</button>
//                                     </div> */}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </Layout>
//     )
// }

// export default SearchHome