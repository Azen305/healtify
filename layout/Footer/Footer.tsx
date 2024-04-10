"use client";
import {
  useStateLists,
  useTrack_Click
} from "@/hooks/react-query/requestCallback.hook";
import { useclientreview } from "@/hooks/react-query/testimonials.hook";
import {
  StateListsdt,
  StatelistsDataRoot
} from "@/interface/statelists.interfaces";
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
import assest from "@/json/assest";
import { FooterWrap } from "@/styles/StyledComponents/FooterWrap";
import FooterSocialIonFour from "@/ui/Icons/FooterSocialIonFour";
import FooterSocialIonOne from "@/ui/Icons/FooterSocialIonOne";
import FooterSocialIonThree from "@/ui/Icons/FooterSocialIonThree";
import FooterSocialIonTwo from "@/ui/Icons/FooterSocialIonTwo";
import MuiModalWrapper from "@/ui/Modal/MuiModalWrapper";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Footer = () => {
  const router = useRouter();
  const [callList, setCallList] = React.useState(false);
  const [statelists, setStatelists] = useState<StateListsdt[] | undefined>();
  const { data, isLoading } = useStateLists((res: StatelistsDataRoot) => {
    const { states } = res?.data;
    console.log(states, "states");

    setStatelists(!!states && states?.length > 0 ? states : []);
  });
  const { mutate, isLoading: trackclickloading } = useTrack_Click();
  const handelModalOpen = () => {
    setCallList(true);
  };
  const handelModalClose = () => {
    setCallList(false);
  };

  console.log("statelists", statelists);

  const handleTrackClick = async (stateid: any) => {
    console.log("id", stateid);
    const payload = {
      id: stateid
    };
    mutate(payload, {
      onSuccess: (res: any) => {
        // console.log("ticktakres", res);
      },
      onError: (error: any) => {
        console.log("error", error);
      }
    });
  };

  const [clientreview, setClientreview] = useState<any>();
  const { data: clientreviewdata, isLoading: clientreviewloading } =
    useclientreview((res: any) => {
      setClientreview(res);
    });

  return (
    <>
      <FooterWrap>
        <Container fixed>
          <Box className="ftrTop_wrapper">
            <Box className="footerTopInfo">
              <Link href="/" className="ftr-logo">
                <Image
                  src={assest.footerLogo}
                  alt="logo"
                  width={50}
                  height={47}
                />
              </Link>
              <List disablePadding>
                <ListItem disablePadding>
                  <Link href={clientreview?.data?.pageContents?.fb_link || ""}>
                    <FooterSocialIonOne />
                  </Link>
                </ListItem>
                <ListItem disablePadding>
                  <Link
                    href={clientreview?.data?.pageContents?.insta_link || ""}
                  >
                    <FooterSocialIonTwo />
                  </Link>
                </ListItem>
                <ListItem disablePadding>
                  <Link
                    href={clientreview?.data?.pageContents?.twitter_link || ""}
                  >
                    <FooterSocialIonThree />
                  </Link>
                </ListItem>
                <ListItem disablePadding>
                  <Link
                    href={clientreview?.data?.pageContents?.linkedin_link || ""}
                  >
                    <FooterSocialIonFour />
                  </Link>
                </ListItem>
              </List>
              <Box className="wrapper_footerBox">
                <Box className="leftWrap">
                  <Box className="textInfo">
                    <Typography variant="body1" className="titletext">
                      Click here to find your
                    </Typography>
                    <Typography variant="body1">
                      Get your free instant quote here
                    </Typography>
                  </Box>
                  <Button type="button" onClick={handelModalOpen}>
                    State numbers
                  </Button>
                </Box>
                <Box className="rightWrap">
                  <Box className="textInfo">
                    <Typography variant="body1" className="titletext">
                      Keep it touch
                    </Typography>
                    <Typography variant="body1">
                      Stay close with us and get your coverage today.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
        <Box className="footerBtm">
          <Container fixed>
            <Box className="copyright">
              <Typography variant="body1">
                © 2024 <Link href="/">Healthie</Link>. All rights reserved.
              </Typography>
              <Typography variant="body1">
                Website Design by <Link href="/">Webskitters</Link>
              </Typography>
            </Box>
          </Container>
        </Box>
      </FooterWrap>

      <MuiModalWrapper
        open={callList}
        title=""
        onClose={handelModalClose}
        className="callDataModal"
      >
        <Box className="wrapper_callListModa">
          <Typography variant="h2">Our local Offices</Typography>
          {isLoading ? (
            <>
              <CircularProgress color="inherit" />
            </>
          ) : (
            <>
              <List disablePadding className="phoneCallList">
                {statelists?.map((item, index) => (
                  <ListItem disablePadding key={index}>
                    <Typography variant="body1">{item.state_name}</Typography>
                    <Link
                      href={`tel:${item.phone}`}
                      onClick={() => {
                        handleTrackClick(item?.id);
                      }}
                    >
                      {item.phone}
                    </Link>
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </Box>
      </MuiModalWrapper>
    </>
  );
};

export default Footer;
