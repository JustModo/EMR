export const formatTime = (time) => {
  return new Date(time).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

export const formatDate = (dateString) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dateObj = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (
    today.getFullYear() === dateObj.getFullYear() &&
    today.getMonth() === dateObj.getMonth() &&
    today.getDate() === dateObj.getDate()
  ) {
    return "Today";
  } else if (
    yesterday.getFullYear() === dateObj.getFullYear() &&
    yesterday.getMonth() === dateObj.getMonth() &&
    yesterday.getDate() === dateObj.getDate()
  ) {
    return "Yesterday";
  }

  const year = dateObj.getFullYear();
  const monthIndex = dateObj.getMonth();
  const month = months[monthIndex];
  const day = ("0" + dateObj.getDate()).slice(-2);

  return `${day} ${month}, ${year}`;
};
