import { ButtonHTMLAttributes, MouseEventHandler } from "react";
import "./style.scss";

export default function CommonButton({ text, onClick, ...props }: ICommonButtonProps) {
  return (
    <button className="common-btn" onClick={onClick} {...props.props}>
      {text}
    </button>
  );
}

export interface ICommonButtonProps {
  text: string;
  onClick?: MouseEventHandler;
  props?: ButtonHTMLAttributes<HTMLButtonElement>;
}
