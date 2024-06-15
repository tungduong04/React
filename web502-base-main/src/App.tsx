import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import { Product } from "./interfaces/Product";
import instance from "./services";

function App() {
  const navigate = useNavigate();
  const [products, setProduct] = useState<Product[]>([]);
  useEffect(() => {
    (async () => {
      const { data } = await instance.get("/products");
      setProduct(data);
    })();
  }, []);
  const handlDeleteProduct = (id: number) => {
    (async () => {
      const isconfirm = confirm("Are you sure you want to delete  ");
      if (isconfirm) {
        await instance.delete(`/products/${id}`);
        setProduct(products.filter((item) => item.id !== id));
      }
    })();
  };
  const handleAddProduct = (product: Product) => {
    (async () => {
      const { data } = await instance.post("/products", product);
      setProduct([...products, data]);
      navigate("/");
    })();
  };
  const handleEditProduct = (product: Product) => {
    (async () => {
      const { data } = await instance.put(`/products/${product.id}`, product);
      setProduct(products.map((item) => (item.id === data.id ? data : item)));
      navigate("/");
    })();
  };
  return (
    <>
      <header>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/add">Add product</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </header>
      <Routes>
        <Route
          index
          element={<Home onDel={handlDeleteProduct} products={products} />}
        />
        <Route
          path="/add"
          element={<AddProduct onSubmit={handleAddProduct} />}
        />
        xx
        <Route
          path="/edit/:id"
          element={<EditProduct onSubmit={handleEditProduct} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
