import { useEffect, useState } from "react";

interface course {
	title: string;
	unit: number | "";
	grade: number | "";
}
const Home = () => {
	const [courses, setCourses] = useState<course[]>([
		{ title: "", unit: "", grade: "" },
	]);
	const [gpa, setGpa] = useState(0);

	const grades = [
		{ value: "A", unit: 5 },
		{ value: "B", unit: 4 },
		{ value: "C", unit: 3 },
		{ value: "D", unit: 2 },
		{ value: "E", unit: 1 },
		{ value: "F", unit: 0 },
	];

	useEffect(() => {
		if (courses.length > 0) {
			let totalPoints = 0;
			let totalUnits = 0;
			courses.forEach((course) => {
				totalPoints += Number(course.unit) * Number(course.grade);
				totalUnits += Number(course.unit);
			});
			setGpa(totalPoints / totalUnits);
		}
	}, [courses]);

	return (
		<main>
			<h1 className="w-full text-center text-3xl p-4 font-bold">CGPA CALC</h1>

			<p className="p-4 ml-4 text-xl">My GPA: {gpa} </p>
			<ul className="p-4 flex flex-col gap-4">
				<li className="grid grid-cols-3 gap-4 lg:text-xl bg-zinc-100 p-4">
					<div>Course Title</div>
					<div>Course Unit</div>
					<div>Grade</div>
				</li>
				{courses.map(({ title, unit, grade }, index) => (
					<li className="grid grid-cols-3 gap-4">
						<input
							onChange={(e) => {
								let localCourses = courses;
								localCourses[index].title = e.target.value;
								setCourses([...localCourses]);
							}}
							value={title}
							type="text"
							placeholder="Eg. MTH 101"
						/>
						<select
							onChange={(e) => {
								let localCourses = courses;
								localCourses[index].unit = Number(e.target.value);
								setCourses([...localCourses]);
							}}
							value={unit}
							name=""
							id=""
						>
							<option value="" hidden>
								Select
							</option>
							{[1, 2, 3, 4, 5].map((i) => (
								<option value={i}>{i}</option>
							))}
						</select>
						<select
							onChange={(e) => {
								let localCourses = courses;
								localCourses[index].grade = Number(e.target.value);
								setCourses([...localCourses]);
							}}
							value={grade}
							name=""
							id=""
						>
							<option value="" hidden>
								Select
							</option>
							{grades.map((grade) => (
								<option value={grade.unit}>{grade.value}</option>
							))}
						</select>
					</li>
				))}
				<li className="grid grid-cols-3 gap-4">
					<button
						onClick={() => {
							let localCourses = courses;
							localCourses.push({ title: "", unit: "", grade: "" });
							setCourses([...localCourses]);
						}}
						className="p-4 bg-zinc-700 rounded font-semibold text-white col-span-3 lg:col-span-1"
					>
						Add Course
					</button>
				</li>
			</ul>
		</main>
	);
};

export default Home;
