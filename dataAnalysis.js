let response = JSON.parse(fakeResponse);
let students = response.data;
const mediansalary = 37156;

function parseCurrency(currency) {
  return parseFloat(currency.replace(/[$,]/g, ""));
}

function sumSalaryChange(sum, obj, i) {
  sum += parseCurrency(obj.salarychange);
  return sum;
}

function avg(obj) {
  return Math.round(obj.reduce(sumSalaryChange, 0) / obj.length);
}

function calculateMedian(arr) {
  let half = Math.floor(arr.length / 2);
  return arr.length % 2
    ? Math.round(arr[half])
    : Math.round((arr[half] + arr[half + 1]) / 2);
}

let averages = [
  {
    category: "Women",
    average: avg(students.filter(student => student.gender === "Female")),
    show: true
  },
  {
    category: "Men",
    average: avg(students.filter(student => student.gender !== "Female")),
    show: true
  },
  {
    category: "POC",
    average: avg(students.filter(student => student.demographic !== "W")),
    show: true
  },
  {
    category: "Veteran",
    average: avg(students.filter(student => student.veteran === "Y")),
    show: true
  },
  {
    category: "One Class",
    average: avg(students.filter(student => student.numberofclasses == 1)),
    show: true
  },
  {
    category: "Multiple Classes",
    average: avg(students.filter(student => student.numberofclasses > 1)),
    show: true
  },
  { category: "Overall", average: avg(students), show: true },
  {
    category: "Below Median",
    average: avg(
      students.filter(
        student => parseCurrency(student.previoussalary) < mediansalary
      )
    ),
    show: true
  }
];

console.log(averages);
