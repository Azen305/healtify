import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import { useMutation, useQuery } from "react-query";
import { STATE_LISTS } from "../react-keys/requestCallback.keys";
interface CallbackRequestBody {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  zipCode: string;
  state: string;
}
interface CallbackResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: any;
}

const requestCallback = async (body: object) => {
  const res = await axiosInstance.post(
    endpoints?.requestCallback?.addrequestCallback,
    body
  );
  return res;
};

export const userequestCallback = () => useMutation(requestCallback);

// Get STate Lists

const getStatelists = async () => {
  const res = await axiosInstance.get(
    `${endpoints?.requestCallback?.state_lists}`
  );
  return res;
};

export const useStateLists = (onSuccess: any = () => {}, onError: any = () => {}) =>
  useQuery([STATE_LISTS], getStatelists, {
    onSuccess,
    onError,
    // enabled: false,
    select: (data) => data?.data ?? []
  });

// Track Click API
const track_click = async (body: object) => {
  const res = await axiosInstance.post(
    endpoints?.requestCallback?.track_click,
    body
  );
  return res;
};

export const useTrack_Click = () => useMutation(track_click);