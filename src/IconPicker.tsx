import { useState, useRef, use, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import "./IconPicker.css";

interface IconPickerProps {
  title?: string;
  value?: string;
  onChange?: (value: string) => void;
  icons?: string[];
  iconSize?: number;
  iconColor?: string;
}

export default function IconPicker({
  title = "",
  value,
  onChange,
  icons = [],
  iconSize = 24,
  iconColor = "#000",
}: IconPickerProps) {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      setSelectedIcon(value);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (onChange) {
      onChange(selectedIcon || "");
    }
  }, [selectedIcon, onChange]);

  const faIcons = Object.entries(FaIcons)
    .filter(([key]) => key.startsWith("Fa"))
    .map(([name, Component]) => ({ name, component: Component }));

  const handleSelect = (iconName: string) => {
    setSelectedIcon(iconName);
    setIsOpen(false);
  };

  return (
    <div className="icon-picker-container">
      <label className="title">{title}</label>

      <button
        className="flex items-center justify-between w-full px-4 py-2 border rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedIcon ? (
          <div className="flex items-center gap-2">
            {faIcons
              .find((icon) => icon.name === selectedIcon)
              ?.component({ className: "w-5 h-5" })}
            <span>{selectedIcon}</span>
          </div>
        ) : (
          <span>Selecione um ícone</span>
        )}
        <span className="ml-auto">&#9662;</span>
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-10 mt-2 w-full max-h-60 overflow-y-auto border rounded-md bg-white shadow-md p-2"
        >
          {faIcons.map((icon) => (
            <button
              key={icon.name}
              onClick={() => handleSelect(icon.name)}
              className="flex items-center w-full px-3 py-2 text-left hover:bg-gray-100 rounded-md"
            >
              <icon.component className="w-5 h-5 mr-2" />
              {icon.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
