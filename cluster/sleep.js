
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = sleep;

// run();

// async function run() {
//   await delay(1000);
//   console.log('This printed after about 1 second');
// }
