import React, { useState } from "react";
import Course from "./course";
import Result from "./result";
import DonutChart from "../components/grade-donut-chart";
import AnimatedNumbers from "react-animated-numbers";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CourseData {
  name: string;
  gradePoints: number;
  grade: string;
  isHonors: boolean;
  credits: number;
  disabled: boolean;
}
interface GradeMap {
  [key: string]: number;
}

const grade_honors: GradeMap = {
  "A+": 5.3,
  A: 5.0,
  "A-": 4.7,
  "B+": 4.3,
  B: 4.0,
  "B-": 3.7,
  "C+": 3.3,
  C: 3.0,
};

const grade_regular: GradeMap = {
  "A+": 4.3,
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
};

const GPACalculator: React.FC = () => {
  const defaultCourses: CourseData[] = [
    {
      name: "Math",
      grade: "A+",
      gradePoints: 5.3,
      isHonors: true,
      credits: 5,
      disabled: false,
    },
    {
      name: "English",
      grade: "A+",
      gradePoints: 5.3,
      isHonors: true,
      credits: 5,
      disabled: false,
    },
    {
      name: "History",
      grade: "A+",
      gradePoints: 5.3,
      isHonors: true,
      credits: 5,
      disabled: false,
    },
    {
      name: "Science",
      grade: "A+",
      gradePoints: 5.3,
      isHonors: true,
      credits: 5,
      disabled: false,
    },
    {
      name: "Language",
      grade: "A+",
      gradePoints: 5.3,
      isHonors: true,
      credits: 5,
      disabled: false,
    },
    {
      name: "Elective Class",
      grade: "A+",
      gradePoints: 5.3,
      isHonors: false,
      credits: 2.5,
      disabled: false,
    },
    {
      name: "Elective Class",
      grade: "A+",
      gradePoints: 5.3,
      isHonors: false,
      credits: 2.5,
      disabled: false,
    },
    {
      name: "Health",
      grade: "A+",
      gradePoints: 5.3,
      isHonors: false,
      credits: 1.25,
      disabled: false,
    },
    {
      name: "Academy",
      grade: "A+",
      gradePoints: 5.3,
      isHonors: false,
      credits: 5,
      disabled: false,
    },
    {
      name: "Academy",
      grade: "A+",
      gradePoints: 5.3,
      isHonors: false,
      credits: 5,
      disabled: false,
    },
  ];

  const [courses, setCourses] = useState<CourseData[]>(defaultCourses);
  const [gpa, setGPA] = useState<number>(0);

  const handleChange = (
    index: number,
    field: string,
    value: string | number | boolean
  ) => {
    const updatedCourses = [...courses];
    updatedCourses[index] = {
      ...updatedCourses[index],
      [field]: value,
    };
    setCourses(updatedCourses);
  };

  const handleDisable = (index: number) => {
    const updatedCourses = [...courses];
    updatedCourses[index].disabled = !updatedCourses[index].disabled;
    setCourses(updatedCourses);
  };

  const calculateGPA = () => {
    const totalCredits = courses.reduce((sum, course) => {
      if (course.disabled) return sum;
      return sum * 1 + course.credits * 1;
    }, 0);
    const totalGradePoints = courses.reduce((sum, course) => {
      if (course.disabled) return sum;
      const isHonors = course.isHonors;
      const gradePoints = isHonors
        ? grade_honors[course.grade]
        : grade_regular[course.grade];
      return sum + gradePoints * course.credits;
    }, 0);
    const gpaValue = totalCredits === 0 ? 0 : totalGradePoints / totalCredits;
    console.log(totalCredits + " " + totalGradePoints);

    setGPA(gpaValue);
  };

  const addCourse = () => {
    setCourses([
      ...courses,
      {
        name: "",
        grade: "A+",
        gradePoints: 5.3,
        isHonors: true,
        credits: 0,
        disabled: false,
      },
    ]);
  };

  const commonStyles = "text-zinc-800 mx-1 mb-1 p-1 px-2 py-1 mx-1 font-bold";

  const buttonStyles =
    "px-5 py-2.5 bg-stone-200 hover:bg-red-200 hover:text-red-600 box-content text-red-600 rounded-lg text-sm font-medium transform transition duration-100";

  return (
    // <div className="inline-block bg-white shadow-sm border shadow-zinc-500/2 rounded-2xl p-6 pb-20">
    <Card className="p-6 pb-20">
      <div className="flex">
        <div className="">
          <div className="pb-5 h-full">
            <table>
              <tbody>
                <tr>
                  <th className={`${commonStyles} w-20 text-left`}>Honors</th>
                  <th className={`${commonStyles} w-56 text-left`}>
                    Course Name
                  </th>
                  <th className={`${commonStyles} w-20 text-left`}>Grade</th>
                  <th className={`${commonStyles} w-20 text-left`}>Credits</th>
                  {/* <th className={`${commonStyles} w-20 text-left`}>Action</th> */}
                </tr>
                {courses.map((course, index) => (
                  <Course
                    key={index}
                    index={index}
                    course={course}
                    onChange={handleChange}
                    onDisable={handleDisable}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="inset-x-0 bottom-0">
            <Button
              variant="outline"
              size="lg"
              onClick={addCourse}
              className="mr-5"
            >
              Add Course
            </Button>
            <Button variant="default" size="lg" onClick={calculateGPA}>
              Calculate GPA
            </Button>
          </div>
        </div>
        <div className="ml-10 m-5 w-72 inline-block">
          {/* <Result gpa={gpa.toFixed(2)} className="text-stone-900" /> */}
          <div className="inset-0 flex justify-center items-center z-10">
            <DonutChart percentColored={(gpa / 4.9) * 100} />
            <p className="absolute text-2xl font-bold text-black"></p>

            <div className="absolute text-2xl font-bold text-black">
              <AnimatedNumbers
                className={
                  "text-2xl font-bold text-black" + (gpa == 0) ? "mx-1" : "mx-2"
                }
                transitions={(index) => ({
                  type: "spring",
                  duration: index / 4 + 0.25,
                })}
                animateToNumber={gpa.toFixed(2)}
              />
              {/* <p className={}>{0}</p> */}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GPACalculator;
