"use client"

import { userequestCallback } from "@/hooks/react-query/requestCallback.hook";
import assest from "@/json/assest";
import validationText from "@/json/messages/validationText";
import { email_Regex } from "@/lib/regex";
import { RequestCallbackWrapper } from "@/styles/StyledComponents/RequestCallbackWrapper";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import ModalIconOne from "@/ui/Icons/ModalIconOne";
import MuiModalWrapper from "@/ui/Modal/MuiModalWrapper";
import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  firstname: yup.string().trim().required(validationText.error.first_name),
  lastname: yup.string().trim().required(validationText.error.last_name),
  phone: yup
    .string()
    .min(10, validationText.error.phoneNumberMin)
    .max(15, validationText.error.phoneNumberMax),
  email: yup
    .string()
    .trim()
    .email(validationText.error.email_format)
    .required(validationText.error.enter_email)
    .matches(email_Regex, validationText.error.email_format),
  zip_code: yup.string().trim().required(validationText.error.zipcode),
  state: yup.string().trim().required(validationText.error.enter_state)
});

export default function RequestCallback() {
  const [callListDetails, setCallListDetails] = React.useState(false);
  const [successMessage, setSuccessMessage] = useState<string | undefined>("");

  // const handelModalCallOpen = () => {
  //   setCallListDetails(true);
  // };
  const handelModalCallClose = () => {
    setCallListDetails(false);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema)
  });
  const { mutate, isLoading } = userequestCallback();
  const onSubmit = async (data: any) => {
    console.log("data", data);
    const formData = new FormData();
    formData.append("firstname", data.firstname);
    formData.append("lastname", data.lastname);
    formData.append("phone", data.phone);
    formData.append("email", data.email);
    formData.append("zip_code", data.zip_code);
    formData.append("state", data.state);
    mutate(formData, {
      onSuccess: (res: any) => {

        setCallListDetails(true);
        reset();
        setSuccessMessage(res?.data?.message);
      },
      // onError: (error: any) => {
      //   console.log("error", error);
      // }
    });
  };
  return (
    <>
      <RequestCallbackWrapper>
        <Box className="wrapper_mainCallBack">
          <figure>
            <Image src={assest.callBackImg} alt="" width={1920} height={525} />
          </figure>
          <Container fixed>
            <Box className="topTitle">
              <Typography variant="h2">Request a callback</Typography>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box className="formWRapperList">
                <Grid container spacing={3}>
                  <Grid item lg={6} md={6} xs={12}>
                    <InputFieldCommon
                      placeholder="John"
                      isLabel
                      labelText="first name*"
                      {...register("firstname")}
                      error={!!errors.firstname}
                      helperText={errors.firstname?.message}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} xs={12}>
                    <InputFieldCommon
                      placeholder="Duo"
                      isLabel
                      labelText="Last name*"
                      {...register("lastname")}
                      error={!!errors.lastname}
                      helperText={errors.lastname?.message}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} xs={12}>
                    <InputFieldCommon
                      placeholder="(406) 555-0120"
                      isLabel
                      labelText="phone number*"
                      {...register("phone")}
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} xs={12}>
                    <InputFieldCommon
                    placeholder="alma.lawson@example.com"
                      isLabel
                      labelText="email (Optional)"
                      {...register("email")}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} xs={12}>
                    <InputFieldCommon
                      placeholder="12345"
                      isLabel
                      labelText="Zip code*"
                      {...register("zip_code")}
                      error={!!errors.zip_code}
                      helperText={errors.zip_code?.message}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} xs={12}>
                    <InputFieldCommon
                      placeholder="State Name"
                      isLabel
                      labelText="State*"
                      {...register("state")}
                      error={!!errors.state}
                      helperText={errors.state?.message}
                    />
                  </Grid>
                </Grid>
                <Box className="btnWrap">
                  <CustomButtonPrimary
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isLoading}
                  >
                    <Typography variant="body1">
                      {" "}
                      {isLoading ? "Loading ..." : "Submit"}
                    </Typography>
                  </CustomButtonPrimary>
                </Box>
              </Box>
            </form>
          </Container>
        </Box>
      </RequestCallbackWrapper>

      <MuiModalWrapper
        open={callListDetails}
        title=""
        onClose={handelModalCallClose}
        className="callDataModal"
      >
        <Box className="detailCallModal">
          <i>
            <ModalIconOne />
          </i>
          <Typography variant="h2">
            {successMessage || "N/A"}
          </Typography>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit sagittis.
          </Typography>
        </Box>
      </MuiModalWrapper>
    </>
  );
}
