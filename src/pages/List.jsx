import ProductList from "../components/ProductList";
import Sidebar from "./Sidebar";

const ListProduct = () => {
  return (
    <>
      <div className="flex h-screen">
        <div className="w-64">
          <Sidebar />
        </div>
        <div className="flex-1">
          <ProductList />
        </div>
      </div>
    </>
  );
};

export default ListProduct;
