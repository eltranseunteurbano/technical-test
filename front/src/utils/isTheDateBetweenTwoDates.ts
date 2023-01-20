const isTheDateBetweenTwoDates = (from: Date, to: Date, check: Date): boolean => {
  const fromUTCMiliseconds = Date.UTC(
    from.getFullYear(),
    from.getMonth(),
    from.getDate(),
    from.getHours(),
    from.getMinutes(),
    from.getSeconds(),
  );

  const toUTCMiliseconds = Date.UTC(
    to.getFullYear(),
    to.getMonth(),
    to.getDate(),
    to.getHours(),
    to.getMinutes(),
    to.getSeconds(),
  );

  const checkUTCMiliseconds = Date.UTC(
    check.getFullYear(),
    check.getMonth(),
    check.getDate(),
    check.getHours(),
    check.getMinutes(),
    check.getSeconds(),
  );

  return (
    checkUTCMiliseconds <= toUTCMiliseconds && checkUTCMiliseconds >= fromUTCMiliseconds
  );
};

export default isTheDateBetweenTwoDates;
