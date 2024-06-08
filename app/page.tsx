"use client";
// import GPACalculator from "@/components/gpa-calculator";

import dynamic from "next/dynamic";
const GPACalculator = dynamic(() => import("../components/gpa-calculator"), {
  ssr: false,
});

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pb-16">
      <div className="max-w-[50rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        {/* Title */}
        <div className="mt-5 mb-10">
          <h1 className="block w-fit mx-auto font-black text-zinc-800 text-4xl md:text-5xl lg:text-5xl mb-20">
            MCST GPA Calculator
          </h1>
        </div>
        {/* End Title */}

        {/* <div className="mt-10 max-w-3xl">
          <p className="text-xl text-stone-600 mb-16">
            Hello! To use this calculator- here&apos;s how it works: Step One-
            Figure out your Numerical grade value for each of your classes- for
            example, if I&apos;m in advanced social studies, and my grade for
            the marking period is An A, my numerical value is 5.3 Repeat that
            process for each grade value. Put the corresponding values under the
            grade column. Once filling out each of the categories press the
            Calculate GPA buttom for your final GPA score
          </p>
        </div> */}
      </div>

      <div className="flex justify-center flex-row w-fit mx-auto">
        {/* <div className="flex justify-center"> */}
        <GPACalculator />
        {/* </div> */}

        <div className="w-full text-sm text-left rtl:text-right text-zinc-900">
          <div className="relative overflow-x-auto">
            <Card className="text-sm text-left rtl:text-right text-zinc-700 rounded-lg overflow-hidden shadow mx-10 my-10">
              <thead className="text-xs bg-primary text-primary-foreground uppercase">
                <tr>
                  {headings.map((heading, index) => (
                    <th key={index} scope="col" className="px-6 py-3 pt-5">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <TableRow key={index} {...row} />
                ))}
              </tbody>
            </Card>
          </div>
        </div>
      </div>
      <div className="w-2/3 max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <Accordion type="single" collapsible className="w-full mt-10">
          <AccordionItem value="item-1">
            <AccordionTrigger>Why isn&apos;t gym a course?</AccordionTrigger>
            <AccordionContent>
              Gym is not counted in your GPA in MCST
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What do the switches do?</AccordionTrigger>
            <AccordionContent>
              They take a course out of it being factored into your calculation.
              For example, if for a year you only took one elective you would
              switch the other one off.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* <CardStackDemo /> */}
    </div>
  );
};

interface TableCellProps {
  value: string | number;
}

const TableCell: React.FC<TableCellProps> = ({ value }) => (
  <td className="px-6 py-4">
    {typeof value === "number" ? value.toFixed(1) : value}
  </td>
);

interface TableRowProps {
  label: string;
  values: (string | number)[];
}

const TableRow: React.FC<TableRowProps> = ({ label, values }) => (
  <tr className="bg-white border-b">
    <th
      scope="row"
      className="px-6 py-4 font-medium text-zinc-900 whitespace-nowrap"
    >
      {label}
    </th>
    {values.map((value, index) => (
      <TableCell key={index} value={value} />
    ))}
  </tr>
);

const headings = ["grade", "honors", "regular"];
const rows = [
  {
    label: "A+",
    values: [5.3, 4.3],
  },
  {
    label: "A",
    values: [5, 4],
  },
  {
    label: "A-",
    values: [4.7, 3.7],
  },
  {
    label: "B+",
    values: [4.3, 3.3],
  },
  {
    label: "B",
    values: [4, 3],
  },
  {
    label: "B-",
    values: [3.7, 2.7],
  },
  {
    label: "C+",
    values: [3.3, 2.3],
  },
  {
    label: "C",
    values: [3, 2],
  },
];

export default HomePage;
