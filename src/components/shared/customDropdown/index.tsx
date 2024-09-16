import { useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { ICustomDropdownProps } from "../../../interfaces";

export default function CustomDropdown({
  value,
  options,
  onChange,
}: ICustomDropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value || "All Categories");
  const toggle = () => setOpen(!open);
  const onSelect = (item: string) => {
    setSelected(item);
    onChange && onChange(item);
  };

  const renderOptions =
    options && options.length ? (
      options?.map((item) => (
        <DropdownItem
          key={item}
          className="text-capitalize"
          onClick={() => onSelect(item)}
        >
          {item}
        </DropdownItem>
      ))
    ) : (
      <DropdownItem disabled>No Options</DropdownItem>
    );

  return (
    <Dropdown className="custom-dropdown" isOpen={open} toggle={toggle}>
      <DropdownToggle className="text-capitalize" caret>
        {selected}
      </DropdownToggle>
      <DropdownMenu>{renderOptions}</DropdownMenu>
    </Dropdown>
  );
}
