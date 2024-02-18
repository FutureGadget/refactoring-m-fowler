const fs = require('fs');
const createStatementData = require('./createStatementData');

main();

function readFile(filename) {
    try {
        const data = fs.readFileSync(filename, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(`Error reading file from disk: ${err}`);
        throw err;
    }
}

function main() {
    // open file named invoices.json
    const invoice = readFile("invoices.json");
    // open file named plays.json
    const plays = readFile("plays.json");

    // call statement function
    const result = statement(invoice[0], plays);
    // print result
    console.log(result);
}

function renderPlainText(data) {
  let result = `Statement for ${data.customer}\n`;
  for (let perf of data.performances) {
    // print line for this order
    result += `  ${perf.play.name}: ${usd(perf.amount / 100)} (${perf.audience} seats)\n`;
  }
  result += `Amount owed is ${usd(data.totalAmount)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  return result;

  function usd(aNumber) {
    return new Intl.NumberFormat("en-US",
      {
        style: "currency", currency: "USD",
        minimumFractionDigits: 2
      }).format(aNumber);
  }
}

function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays), plays);
}

module.exports = statement;