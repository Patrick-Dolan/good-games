// Format date to be more readable
// Example: 2021-01-01 -> January 1st, 2021
export function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  let suffix = "th";
  if (day === 1 || day === 21 || day === 31) {
    suffix = "st";
  } else if (day === 2 || day === 22) {
    suffix = "nd";
  } else if (day === 3 || day === 23) {
    suffix = "rd";
  }
  const formattedDay = `${day}${suffix}`;
  const formattedMonth = date.toLocaleString('default', { month: 'long' });
  const formattedYear = date.getFullYear();
  return `${formattedMonth} ${formattedDay}, ${formattedYear}`;
}