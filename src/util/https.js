import axios from "axios";

export async function testBottles() {
  const bottles = await axios.get(
    "https://courageous-tuna-shirt.cyclic.app/api/bottles"
  );
  // console.log("Bottles: ", bottles.data);

  // const response = await axios.get(BACKEND_URL + "/expenses.json");

  // const expenses = [];

  // for (const key in response.data) {
  //   const expenseObj = {
  //     id: key,
  //     amount: response.data[key].amount,
  //     date: new Date(response.data[key].date),
  //     description: response.data[key].description,
  //   };
  //   expenses.push(expenseObj);
  // }

  return bottles;
}
