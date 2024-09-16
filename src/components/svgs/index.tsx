import { ISVGProps } from "../../interfaces";

export const CartIcon = ({ fillColor = "currentColor" }: ISVGProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={fillColor}
      className="cart-svg"
    >
      <path d="M7 4V2H3v2H0v2h2l3.6 7.59L4.24 16c-.12.23-.18.49-.18.76 0 .83.67 1.5 1.5 1.5H19v-2H5.42c-.08 0-.15-.05-.18-.12l.03-.06L6.1 14h9.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49-1.74-1-3.6 6.49H7.53L5.16 6H19V4H7zM6 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
  );
};
