export const fundedDateFormate = (datee) => {
  if (!datee) return "-";
  const options = { year: "numeric", month: "short", day: "numeric" };
  const date = new Date(datee);
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};

export const guaranteedDate = (datee, days) => {
  if (!datee) return "-";
  const options = { year: "numeric", month: "short", day: "numeric" };
  const date = new Date(datee);
  date.setDate(date.getDate() + days); // Add 30 days
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};

export function transactionDateAndTime(datee) {
  if (!datee)
    return { formattedDate: "Invalid Date", formattedTime: "Invalid Time" };

  let date = new Date(datee);

  if (isNaN(date.getTime())) {
    return { formattedDate: "Invalid Date", formattedTime: "Invalid Time" };
  }

  let month = date.getMonth() + 1;
  let day = date.getDate();
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes.toString().padStart(2, "0");
  seconds = seconds.toString().padStart(2, "0");
  month = month.toString().padStart(2, "0");
  day = day.toString().padStart(2, "0");

  let formattedDate = `${month}/${day}/${year}`;
  let formattedTime = `${hours}:${minutes}:${seconds} ${ampm}`;

  return { formattedDate, formattedTime };
}
