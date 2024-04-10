

import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import { useQuery } from "react-query";
import { CLIENT_REVIEW, TESTIMONIAL_DETAILS } from "../react-keys/testomonils.keys";
// Get testimonials details
const gettestimonials = async () => {
  const res = await axiosInstance.get(
    `${endpoints?.testimonials?.testimonialsdata}`
  );
  return res;
};

export const usetestimonials = (onSuccess: any = () => {}, onError: any = () => {}) =>
  useQuery([TESTIMONIAL_DETAILS], gettestimonials, {
    onSuccess,
    onError,
    // enabled: false,
    select: (data) => data?.data ?? []
  });

// get client review


const getclientreview = async () => {
  const res = await axiosInstance.get(
    `${endpoints?.testimonials?.clientreview}`
  );
  return res;
};

export const useclientreview = (onSuccess: any = () => {}, onError: any = () => {}) =>
  useQuery([CLIENT_REVIEW], getclientreview, {
    onSuccess,
    onError,
    // enabled: false,
    select: (data) => data?.data ?? []
  });