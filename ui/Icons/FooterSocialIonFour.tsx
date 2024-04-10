import { CustomIconProps } from "@/interface/icons.interface";

export default function FooterSocialIonFour({
  IconColor,
  IconHeight,
  IconWidth
}: CustomIconProps) {
  return (
    <svg
      width={IconWidth || "14"}
      height={IconHeight || "14"}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 14V8.8725C14 6.3525 13.4575 4.4275 10.5175 4.4275C9.1 4.4275 8.155 5.1975 7.77 5.9325H7.735V4.655H4.9525V14H7.8575V9.3625C7.8575 8.1375 8.085 6.965 9.59 6.965C11.0775 6.965 11.095 8.3475 11.095 9.4325V13.9825H14V14ZM0.2275 4.655H3.1325V14H0.2275V4.655ZM1.68 0C0.7525 0 0 0.7525 0 1.68C0 2.6075 0.7525 3.3775 1.68 3.3775C2.6075 3.3775 3.36 2.6075 3.36 1.68C3.36 0.7525 2.6075 0 1.68 0Z"
        fill={IconColor || "#FFBC00"}
      />
    </svg>
  );
}
