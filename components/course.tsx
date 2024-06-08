import React, { ChangeEvent, Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

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
  "relative border cursor-default overflow-hidden rounded-lg bg-white hover:bg-zinc-50 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-red-300 sm:text-sm text-zinc-800 py-2 px-2 text-sm leading-5 text-zinc-900 focus:ring-0";

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
                    active ? "bg-red-100 text-red-900" : "text-zinc-900"
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

  const handleSwitchChange = (checked: boolean) => {
    setIsChecked(!checked);
    handleDisable();
  };

  return (
    <tr className={isChecked ? "opacity-50" : "opacity-100"}>
      <td>
        <Checkbox
          checked={course.isHonors}
          onCheckedChange={(checked) => handleChange("isHonors", checked)}
          className="ml-2"
        />
      </td>
      <td>
        {/* <input
          className={`${commonStyles}`}
          type="text"
          value={course.name}
          placeholder="Course Name"
          onChange={(e) => handleChange("name", e.target.value)}
          disabled={isChecked}
        /> */}
        <Input
          type="text"
          className="w-60 focus:!ring-0"
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
        <Input
          type="number"
          className="w-60 focus:!ring-0"
          value={course.credits * 1}
          placeholder="--"
          onChange={(e) => handleChange("credits", e.target.value)}
          disabled={isChecked}
        />
      </td>
      <td>
        <Switch
          checked={!isChecked}
          onCheckedChange={handleSwitchChange}
          className="ml-2"
        />
      </td>
    </tr>
  );
};

export default Course;
