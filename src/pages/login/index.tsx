import { Button, TextField } from "@mui/material";
import axios, { AxiosError } from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { setCookie } from "nookies";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import login from "../../../public/home.svg";
import styles from "./login.module.scss";

interface IAuthData {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthData>();

  async function handleAuth(data: IAuthData) {
    axios
      .post("http://localhost:8000/auth/signin", data)
      .then((response) => {
        setCookie(null, "token", response.data.access_token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        if (response.status === 201) {
          window.location.href = "/products";
          return;
        }
      })
      .catch((error: AxiosError) => {
        if (error.response?.status) {
          alert("Invalid credentials");
        }
      });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
      </Head>

      <div className={styles.loginForm}>
        <h1>Product Sales</h1>

        <form onSubmit={handleSubmit(handleAuth)}>
          <TextField
            id="email"
            label="E-MAIL"
            variant="standard"
            color="warning"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span style={{ color: "red" }}>This field is required</span>
          )}

          <TextField
            id="password"
            label="PASSWORD"
            variant="standard"
            color="warning"
            type={"password"}
            {...register("password", { required: true })}
          />
          {errors.email && (
            <span style={{ color: "red" }}>This field is required</span>
          )}

          <Button
            variant="contained"
            size="large"
            color="warning"
            type="submit"
          >
            LOGIN
          </Button>

          <span>
            New around here?
            <Link href="/register" passHref={true}>
              <a href="#"> signup</a>
            </Link>
          </span>
        </form>
      </div>

      <div className={styles.image}>
        <Image src={login} alt="Imagem de mulher mostrando quadro de vendas" />
      </div>
    </div>
  );
}
