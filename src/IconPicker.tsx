import { useState, useRef } from "react";
import * as FaIcons from "react-icons/fa";

interface IconPickerProps {
  title?: string;
}

// TODO add props(value?, icons)
export default function IconPicker({ title = "" }: IconPickerProps) {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const faIcons = Object.entries(FaIcons)
    .filter(([key]) => key.startsWith("Fa"))
    .map(([name, Component]) => ({ name, component: Component }));

  const handleSelect = (iconName: string) => {
    setSelectedIcon(iconName);
    setIsOpen(false);
  };

  return (
    <div className="relative w-64 flex">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {title}
      </label>

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
