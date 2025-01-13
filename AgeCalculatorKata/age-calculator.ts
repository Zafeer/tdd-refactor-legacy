export const ageCalculator = () => {
  return function (birthDate: Date, targetDate: Date) {
    const completedYears = targetDate.getFullYear() - birthDate.getFullYear();
    if (birthDate.getMonth() > targetDate.getMonth()) return completedYears - 1;
    if (hasHadBirthday(birthDate, targetDate)) return completedYears;
    return completedYears - 1;
  };
};

// function hasNotYedHadBirthday(birthDate: Date, targetDate: Date) {
//   return (
//     birthDate.getMonth() === targetDate.getMonth() &&
//     birthDate.getDate() > targetDate.getDate()
//   );
// }

function hasHadBirthday(birthDate: Date, targetDate: Date) {
  return !(
    birthDate.getMonth() === targetDate.getMonth() &&
    birthDate.getDate() > targetDate.getDate()
  );
}
