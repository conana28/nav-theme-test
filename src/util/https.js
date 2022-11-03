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

export async function searchBottles(searchObj) {
  const bottles = await axios.post(
    `https://courageous-tuna-shirt.cyclic.app/api/bottles/bottlesearch?page=1&limit=2000`,
    searchObj
  );
  return bottles.data.data;
}

export async function getBottle(bid) {
  let result = "";
  await axios
    .get(`https://courageous-tuna-shirt.cyclic.app/api/bottles/${bid}`)
    .then((response) => {
      // console.log(response.data);
      result = response.data;
    })
    .catch((error) => {
      // console.log(error.response.data);
      result = error.response.data;
      setError("Consume error occured");
    });
  return result;
}

export async function consumeBottle(bid, cDate) {
  let result = "";
  await axios
    .delete(`https://courageous-tuna-shirt.cyclic.app/api/bottles/${bid}`, {
      data: { consume: cDate },
    })
    .then((response) => {
      // console.log(response.data);
      result = response.data;
    })
    .catch((error) => {
      // console.log(error.response.data);
      result = error.response.data;
      setError("Consume error occured");
    });
  return result;
}

export async function updateBottle(bid, btl) {
  let result = "";
  await axios
    .patch(`https://courageous-tuna-shirt.cyclic.app/api/bottles/${bid}`, btl)
    .then((response) => {
      console.log(response.data);
      result = response.data;
    })
    .catch((error) => {
      // console.log(error.response.data);
      result = error.response.data;
      setError("Consume error occured");
    });
  return result;
}

export async function deleteBottle(bid) {
  let result = "";
  await axios
    .delete(`https://courageous-tuna-shirt.cyclic.app/api/bottles/d/${bid}`)
    .then((response) => {
      // console.log(response.data);
      result = response.data;
    })
    .catch((error) => {
      // console.log(error.response.data);
      result = error.response.data;
      setError("Consume error occured");
    });
  return result;
}

// Wine

export async function searchWines(searchObj) {
  const wines = await axios.post(
    `https://courageous-tuna-shirt.cyclic.app/api/wines/winesearch?page=1&limit=2000`,
    searchObj
  );
  return wines.data.data;
}

export async function addBottleWine(btl) {
  let result = "";
  await axios
    .post(`https://courageous-tuna-shirt.cyclic.app/api/bottles`, btl)
    .then((response) => {
      console.log(response.data);
      result = response.data;
    })
    .catch((error) => {
      // console.log(error.response.data);
      result = error.response.data;
      setError("Add bottle error occured");
    });
  return result;
}

// Notes

export async function getNotesById(wId) {
  let sorted = "";
  await axios
    .get(`https://courageous-tuna-shirt.cyclic.app/api/notes/${wId}/all`)
    .then((response) => {
      sorted = response.data.notes.sort((a, b) => a.vintage - b.vintage);
    })
    .catch((error) => {
      console.log(error);
      setError("Some error occured");
    });
  return sorted;
}
