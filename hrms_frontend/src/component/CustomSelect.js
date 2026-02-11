import { useState, useRef, useEffect } from "react";
import Icons from "../myIcon/Icons";

const CustomSelect = ({
  name, // New prop for the field name
  options = [],
  placeholder = "Select",
  onChange = () => { },
  multiple = false,
  defaultValue = multiple ? [] : null, // Prop for default selected value
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(multiple ? [] : null);
  const dropdownRef = useRef(null);

  // useEffect(() => {
  //   // Initialize the selected state based on the defaultValue prop
  //   if (defaultValue) {
  //     if (multiple) {
  //       const defaultOptions = options.filter((option) =>
  //         defaultValue.includes(option._id)
  //       );
  //       setSelected(defaultOptions);
  //     } else {
  //       const defaultOption = options.find((option) => option._id === defaultValue);
  //       setSelected(defaultOption || null);
  //     }
  //   }
  // }, [defaultValue, options, multiple]);


  useEffect(() => {
    // normalize defaultValue to array of ids (same helper as before)
    const normalizeIds = (dv) => {
      if (!dv) return [];
      if (Array.isArray(dv)) {
        if (dv.length === 0) return [];
        if (typeof dv[0] === "object" && dv[0] !== null) return dv.map((o) => o._id);
        return dv;
      }
      if (typeof dv === "string") {
        return dv.split(",").map((s) => s.trim()).filter(Boolean);
      }
      if (typeof dv === "object" && dv._id) return [dv._id];
      return [];
    };

    if (multiple) {
      const ids = normalizeIds(defaultValue);

      if (ids.length === 0) {
        setSelected([]); // clear selection when no ids
        return;
      }

      // IMPORTANT: preserve order of ids by mapping each id to its option
      const selectedOptions = ids
        .map((id) => options.find((opt) => opt._id === id))
        .filter(Boolean); // remove any not-found ids

      setSelected(selectedOptions);
    } else {
      // single-select logic...
      if (!defaultValue) {
        setSelected(null);
        return;
      }

      let selectedOption = null;

      if (typeof defaultValue === "object" && defaultValue.id) {
        // if defaultValue is full object
        selectedOption = options.find((opt) => opt._id === defaultValue.id);
      } else {
        // if defaultValue is id or array of ids
        const id = Array.isArray(defaultValue) ? defaultValue[0] : defaultValue;
        selectedOption = options.find((opt) => opt.id === id);
      }

      setSelected(selectedOption || null);
    }
  }, [defaultValue, options, multiple]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    if (multiple) {
      const isAlreadySelected = selected.some((item) => item.id === option.id);
      const updatedSelection = isAlreadySelected
        ? selected.filter((item) => item.id !== option.id)
        : [...selected, option];

      setSelected(updatedSelection);

      const ids = updatedSelection.map((item) => item.id).join(",");
      const fakeEvent = { target: { name, value: ids } }; // Include the name if provided
      onChange(fakeEvent);
    } else {
      setSelected(option);
      setIsOpen(false);

      const fakeEvent = { target: { name, value: option.id } }; // Include the name if provided
      onChange(fakeEvent);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const isSelected = (option) => {
    if (multiple) {
      return selected.some((item) => item.id === option.id);
    }
    return selected?.id === option.id;
  };

  return (
    <div className="custom-select-wrapper form-control" ref={dropdownRef}>
      <div className="custom-select" onClick={toggleDropdown}>
        <div className="custom-select-trigger">
          {multiple
            ? selected.length > 0
              ? selected.map((item) => item.name || item.title).join(", ")
              : placeholder
            : selected?.name || selected?.title || placeholder}
        </div>
        <Icons name="arrowDown" />
        {isOpen && (
          <div className="custom-options">
            <span
              className={`custom-option ${isSelected("") ? "selected" : ""
                }`}
              onClick={() => handleOptionClick("")}
            >
              {"Select"}
            </span>
            {options.map((option) => (
              <span
                key={option.id}
                className={`custom-option ${isSelected(option) ? "selected" : ""
                  }`}
                onClick={() => handleOptionClick(option)}
              >
                {option.name || option.title}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;