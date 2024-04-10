/* eslint-disable react/no-array-index-key */
import assest from "@/json/assest";
import { HelpYouSectionWrap } from "@/styles/StyledComponents/HelpYouSectionWrap";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export default function HelpYouSection() {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: false,
    arrows: false,
    speed: 2000,
    autoplaySpeed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 899,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "60px"
        }
      }
    ]
  };

  const sliderDataListHelp = [
    {
      imgPath: assest.listImg1,
      title: "Bridge Coverage",
      listText: [
        {
          textList: "Short-Term"
        },
        {
          textList: "Comprehensive benefits included"
        },
        {
          textList: "Ready for immediate activation"
        },
        {
          textList: "No copayments or coinsurance requirements"
        }
      ]
    },
    {
      imgPath: assest.listImg2,
      title: "Fixed Indemnity Coverage",
      listText: [
        {
          textList: "Direct Cash Payouts"
        },
        {
          textList: "Supplemental to Current Coverage"
        },
        {
          textList: "Covers Out-of-Pocket Expenses"
        },
        {
          textList: "Offers Additional Flexibility"
        }
      ]
    },
    {
      imgPath: assest.listImg3,
      title: "Dental, Vision & Hearing Coverage",
      listText: [
        {
          textList: "Essential Add-Ons"
        },
        {
          textList: "Superior Coverage Options"
        },
        {
          textList: "Available Discount Programs"
        },
        {
          textList: "Major Carriers Available"
        }
      ]
    },
    {
      imgPath: assest.listImg4,
      title: "Comprehensive Coverage",
      listText: [
        {
          textList: "Covers All Essential Benefits"
        },
        {
          textList: "Affordable Care Act Standards"
        },
        {
          textList: "Reduces Out-of-Pocket Expenses"
        },
        {
          textList: "Covers Everything You Need"
        }
      ]
    }
  ];
  return (
    <HelpYouSectionWrap>
      <Image
        src={assest.lineShape2}
        alt="shape"
        width={574}
        height={232}
        className="lineShapeImg"
      />
      <Box className="helpYouMain">
        <Container fixed>
          <Box className="topTitle">
            <Typography variant="h2">
              learn how healthie health help you lower costs and save time
            </Typography>
          </Box>
          <Box className="sliderMainWrap">
            <Slider {...settings}>
              {sliderDataListHelp.map((item, index) => (
                <Box className="sliderCardInner" key={index}>
                  <figure>
                    <Image src={item.imgPath} alt="" width={232} height={250} />
                  </figure>
                  <Typography variant="body1" className="titleText">
                    {item.title}
                  </Typography>
                  <List disablePadding>
                    {item.listText.map((items, index) => (
                      <ListItem disablePadding key={index}>
                        {items.textList}
                      </ListItem>
                    ))}
                  </List>
                  <CustomButtonPrimary variant="contained" color="primary">
                    <Typography variant="body1">
                      Get an instant quote
                    </Typography>
                  </CustomButtonPrimary>
                </Box>
              ))}
            </Slider>
          </Box>
        </Container>
      </Box>
    </HelpYouSectionWrap>
  );
}
