import moment from "moment";
import Token, { STATUS } from "../models/base/Token";
import dotenv from "dotenv";

// ----------------------------------
// Environment setup
// ----------------------------------
dotenv.config({ path: ".env" });
const { API_URL = "http://localhost", WEB_PORT = 80 } = process.env;

/**
 * Get random items from the given array
 * @param items
 * @param random_count
 */
export function nRandomItems(items: any[], random_count: number) {
  // Get random_count random items from items
  const random10 = [...Array(random_count).keys()];
  const random_items = random10.map(() => {
    const num = items[Math.floor(Math.random() * items.length)];
    items = items.filter((item) => item !== num);
    return num;
  });
  return random_items.sort((a, b) => Number(a) - Number(b));
}

/**
 * Get timestamp round to number of seconds
 * @param seconds - Round to number of seconds
 */
export const roundTimestamp = (seconds: number) => {
  const timestamp = Date.now();
  const remainder = timestamp % (seconds * 1000);
  const rounded = timestamp - remainder;
  //   console.log(
  //     "ROUNDED ",
  //     moment(timestamp).format("YYYY-MM-DD h:mm:ss a"),
  //     moment(rounded).format("YYYY-MM-DD h:mm:ss a")
  //   );
  return rounded; // milliseconds
};

export const getLoggedInUser = async (req: any) => {
  const { status, authData }: any = await Token.verify(req, true);
  console.log("getLoggedInUser: ", status, authData);

  if (status === STATUS.verified) {
    return authData;
  }
  return null;
};

export const getResetPasswordMessage = (hash: string) => {
  return `
    Välkommen till Hantverkshjalpenonline,
    Ditt konto har nu skapats.
    Vänligen följ länken nedan för att skapa dina inloggningsuppgifter.
    ${API_URL}:${WEB_PORT}/create-new-password/${hash}`;
};

export const getResetPasswordLink = (hash: string) => {
  return `${API_URL}:${WEB_PORT}/create-new-password/${hash}`;
};
