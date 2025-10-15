import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import ReactSelect, { components, createFilter } from "react-select";

// Custom Menu component for "Add New" button
const Menu = ({ onClickAdd, hasAddOption, children, ...rest }) => (
  <components.MenuList {...rest}>
    {children}
    {hasAddOption && (
      <button
        type="button"
        onClick={onClickAdd}
        className="w-full font-bold rounded-none mt-1 bg-gray-200 hover:bg-gray-300"
      >
        Add New
      </button>
    )}
  </components.MenuList>
);

Menu.propTypes = {
  onClickAdd: PropTypes.func,
  hasAddOption: PropTypes.bool,
  children: PropTypes.node,
};

const dummyOptions = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
];

export const RHFSelect = ({
  name,
  label,
  isMulti,
  options,
  hasAddOption,
  onClickAdd,
  customMenu: CustomMenu,
  groupStyles,
  groupClassName,
  required,
  hasDummyOptions,
  noOptional,
  ...rest
}) => {
  const { control } = useFormContext();
  const selectOptions = hasDummyOptions ? dummyOptions : options;

  const getSelectValue = (value) => {
    if (!value || !selectOptions) return "";
    if (isMulti) {
      return selectOptions.filter((option) => value?.includes(option.value));
    }
    return selectOptions.find((option) => option.value === value) || null;
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className={`${groupClassName} mb-4`} style={groupStyles}>
          {!!label && (
            <label className="block text-sm font-medium text-gray-700">
              {label}{" "}
              {!required && (
                <span className="text-gray-500">
                  {!noOptional && "(optional)"}
                </span>
              )}
            </label>
          )}
          <ReactSelect
            value={getSelectValue(value)}
            onChange={(option) => {
              if (isMulti) {
                onChange(option ? option.map((item) => item.value) : []);
              } else {
                onChange(option ? option.value : null);
              }
            }}
            classNamePrefix="react-select"
            isMulti={isMulti}
            options={selectOptions}
            closeMenuOnSelect={!isMulti}
            {...rest}
            components={{
              IndicatorSeparator: () => null,
              MenuList: (props) =>
                CustomMenu ? (
                  <CustomMenu {...props} />
                ) : (
                  <Menu
                    {...props}
                    onClickAdd={onClickAdd}
                    hasAddOption={hasAddOption}
                  />
                ),
            }}
            filterOption={createFilter({ ignoreAccents: false })}
          />
          {error && (
            <p className="mt-1 text-sm text-red-600">{error.message}</p>
          )}
        </div>
      )}
    />
  );
};

RHFSelect.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  isMulti: PropTypes.bool,
  options: PropTypes.array,
  hasAddOption: PropTypes.bool,
  onClickAdd: PropTypes.func,
  customMenu: PropTypes.func,
  groupStyles: PropTypes.object,
  groupClassName: PropTypes.string,
  required: PropTypes.bool,
  hasDummyOptions: PropTypes.bool,
  noOptional: PropTypes.bool,
};
