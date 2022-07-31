//import node module to allow text doc to be read
import { readFileSync, writeFile } from "fs";
// import { ArrayBuffer } from "buffer";

function createNewTextFile() {
  //GLOBAL VARIABLES
  const arrData = readFile("latest-customers.txt");
  const newData = filterCustomers();
  //function to read txt file and convert to json array
  function readFile(filename, err) {
    //error handling
    if (err) throw err;
    //calling the file sync module to get raw text data
    const contents = readFileSync(filename, "utf-8");

    // Splitting data by lines
    const data = contents.split("\n");

    // Extract array headers and cut it from data
    const headers = data.shift().split(",");

    // Defining JSON array
    let json = [];

    //Looping data
    for (let i = 0; i < data.length; i++) {
      // Split data line by cells
      const contentCells = data[i].split(",");

      // Looping cells
      let jsonLine = {};
      for (let i = 0; i < contentCells.length; i++)
        jsonLine[headers[i]] = contentCells[i];

      // Push new line to json array
      json.push(jsonLine);
    }

    // Result
    // console.log(json);

    return json;
  }
  //calling function
  readFile("latest-customers.txt");

  //Second Function

  //function to filter customers
  function filterCustomers() {
    //Creating variable for filtered data
    let filteredCustomers = arrData
      //Filtering data by age
      .filter((c) => c.age >= 40 && c.age <= 59)
      //Mapping through to find specified values
      .map((cs) => ({ Name: cs.name, Email: cs.email, Phone: cs.phone }));

    //Result
    // console.log(filteredCustomers);

    return filteredCustomers;
  }
  //calling function
  filterCustomers();

  //third function
  function createNewFile() {
    //converting array data to a string then seperating each item on a new line
    const data = JSON.stringify(newData).split(",").join("\r\n");
    //creating the new file
    writeFile("affected-customers.txt", data, (err) => {
      //error catch
      if (err) throw err;
    });
    console.log("New File Created");
    console.log(data);
  }

  createNewFile();
}

createNewTextFile();
