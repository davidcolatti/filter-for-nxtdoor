const fs = require("fs");
const csvOrExcel = require("csv-excel-to-json");
const { convertArrayToCSV } = require("convert-array-to-csv");

const keywords = fs.readFileSync("keywords.txt").toString().split("\r\n");

const writeJson = () => {
  csvOrExcel.convertToJson("./data.csv", "./data.json");
};

const main = async () => {
  writeJson();

  let data;
  await setTimeout(async () => {
    data = require("./data.json");

    const filteredData = data.filter((lead) => {
      return !!keywords.find((word) => lead.category === word);
    });

    console.log(`Found ${filteredData.length} out of ${data.length}`);

    const csv = await convertArrayToCSV(filteredData);

    fs.writeFile("./output.csv", csv, () => {});
  }, 500);
};

main();
