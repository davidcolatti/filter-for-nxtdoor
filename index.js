const fs = require("fs");
const { csvFileToArray, arrayToCsvFile } = require("csv-to-and-from-array");

const main = async () => {
  const keywords = fs.readFileSync(`keywords.txt`).toString().split("\r\n");

  const data = await csvFileToArray({ filePath: "./data.csv" });

  const filteredData = data.filter((lead) => {
    return !!keywords.find(
      (word) => lead.category === word && !!lead.phone_number
    );
  });

  arrayToCsvFile({
    data: filteredData,
    filePath: `./output.csv`,
    callback: () =>
      console.log(`Found ${filteredData.length} out of ${data.length}`),
  });
};

const types = ["nextdoor", "other"];

main(types[0]);
