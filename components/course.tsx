import React, { ChangeEvent, Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface CourseProps {
  index: number;
  course: {
    name: string;
    grade: string;
    credits: number;
    isHonors: boolean;
    disabled: boolean;
  };
  onChange: (
    index: number,
    field: string,
    value: string | number | boolean
  ) => void;
  onDisable: (index: number) => void;
}

const commonStyles =
  "relative border cursor-default overflow-hidden rounded-lg bg-white hover:bg-zinc-50 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm text-zinc-800 py-2 px-2 text-sm leading-5 text-zinc-900 focus:ring-0";

const grades = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C"];
const GradeDropdown: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <Listbox.Button
          className={`${commonStyles} w-20 flex items-center justify-between`}
        >
          <span className="block truncate">{value}</span>
          <ChevronUpDownIcon
            className="h-5 w-5 text-zinc-400"
            aria-hidden="true"
          />
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-20 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {grades.map((grade, gradeIdx) => (
              <Listbox.Option
                key={gradeIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-5 ${
                    active ? "bg-teal-100 text-teal-900" : "text-zinc-900"
                  }`
                }
                value={grade}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {grade}
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

const HonorsCheckbox: React.FC<{
  value: boolean;
  onChange: (value: boolean) => void;
}> = ({ value, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <div className="inline-flex items-center">
      <label
        className="relative flex items-center p-0 rounded-full cursor-pointer"
        htmlFor={`honors-checkbox-${value}`}
      >
        <input
          id={`honors-checkbox-${value}`}
          type="checkbox"
          checked={value}
          onChange={handleChange}
          className="w-4 h-4 text-teal-600 bg-zinc-100 border-zinc-300 rounded focus:ring-teal-500"
        />
      </label>
    </div>
  );
};

const Course: React.FC<CourseProps> = ({
  index,
  course,
  onChange,
  onDisable,
}) => {
  const [isChecked, setIsChecked] = useState(course.disabled);

  const handleChange = (field: string, value: string | number | boolean) => {
    onChange(index, field, value);
  };

  const handleDisable = () => {
    onDisable(index);
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    handleDisable();
  };

  return (
    <tr className={isChecked ? "opacity-50" : "opacity-100"}>
      <td>
        <HonorsCheckbox
          value={course.isHonors}
          onChange={(value) => handleChange("isHonors", value)}
        />
      </td>
      <td>
        <input
          className={`${commonStyles} w-56`}
          type="text"
          value={course.name}
          placeholder="Course Name"
          onChange={(e) => handleChange("name", e.target.value)}
          disabled={isChecked}
        />
      </td>
      <td>
        <GradeDropdown
          value={course.grade}
          onChange={(value) => handleChange("grade", value)}
        />
      </td>
      <td>
        <input
          className={`${commonStyles} w-20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
          type="number"
          value={course.credits}
          placeholder="--"
          onChange={(e) => handleChange("credits", e.target.value)}
          disabled={isChecked}
        />
      </td>
      <td>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="w-4 h-4 text-teal-600 bg-zinc-100 border-zinc-300 rounded focus:ring-teal-500"
        />
      </td>
    </tr>
  );
};

export default Course;
