export function generateRandomString(key: string): string {
  const length: number = 5;
  const characters: string =
    "abcdefghjkmnopqrstuvwxyzABCDEFGHJKMNOPQRSTUVWXYZ1234567890";
  let randomString: string = "";

  for (let i = 0; i < length; i++) {
    const randomIndex: number = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }
  return randomString;
}
export const calculateDaysDifference = (date1: Date, date2: Date): number => {
  // Calculate the difference in milliseconds
  const timeDifference = Math.abs(date1.getTime() - date2.getTime());

  // Convert the difference to days
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

  return daysDifference;
};
