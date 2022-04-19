import { Button, TextField } from "@mui/material";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import photo from "../../../public/home.svg";
import styles from "./register.module.scss";

interface IRegisterData {
  name: string;
  last_name: string;
  email: string;
  password: string;
}

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterData>();

  const submit: SubmitHandler<IRegisterData> = async (data) => {
    await axios
      .post("http://localhost:8000/auth/signup", data)
      .then((response) => {
        if (response.status === 201) {
          window.location.href = "/login";
        }
      });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>register</title>
      </Head>

      <div className={styles.registerForm}>
        <form onSubmit={handleSubmit(submit)}>
          <TextField
            id="name"
            label="NAME"
            variant="standard"
            color="warning"
            {...register("name", { required: true })}
          />
          <TextField
            id="lastname"
            label="LASTNAME"
            variant="standard"
            color="warning"
            {...register("last_name", { required: true })}
          />
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
          {errors.password && (
            <span style={{ color: "red" }}>This field is required</span>
          )}
          <Button
            variant="contained"
            size="large"
            color="warning"
            type="submit"
          >
            register
          </Button>
        </form>
      </div>

      <div className={styles.image}>
        <Image src={photo} alt="Imagem de mulher mostrando quadro de vendas" />
      </div>
    </div>
  );
}
