import { ISeachInputProps } from "../../../interfaces";
import "./style.scss";

export default function SearchInput({
  value,
  onChange,
  placeholder,
  ...props
}: ISeachInputProps) {
  return (
    <div className="search-input">
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
}
