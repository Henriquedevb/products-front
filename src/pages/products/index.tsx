import axios from "axios";
import jwt_decode from "jwt-decode";
import Head from "next/head";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import NavBar from "../../components/navbar";
import ProductCard from "../../components/product-card";
import styles from "./products.module.scss";

interface IPayloadToken {
  email: string;
  isAuthorizedSeller: boolean;
  name: string;
  user_id: string;
}

interface IProduct {
  category: string;
  createdAt: string;
  deletedAt: string;
  description: string;
  id: string;
  price: string;
  productTitle: string;
  updatedAt: string;
  userId: string;
}

export default function Products() {
  const [user, setUser] = useState<IPayloadToken>();
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.token;

    if (token) {
      const jwtDecoded = jwt_decode<IPayloadToken>(token);
      setUser(jwtDecoded);
    }

    axios
      .get("http://localhost:8000/product", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Products</title>
      </Head>

      <NavBar
        title={user?.isAuthorizedSeller ? "Meus Produtos" : "Produtos"}
        isAdm={user?.isAuthorizedSeller}
      />

      <div className={styles.products}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            description={product.description}
            imageCard={product.productTitle}
            title={product.productTitle}
          />
        ))}
      </div>
    </div>
  );
}
