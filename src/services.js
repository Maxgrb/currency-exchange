/**
 * App Services
 * Contains single method to update rates
 */
const getRates = base => (
  fetch(`https://api.fixer.io/latest?base=${base}&symbols=GBP,EUR,USD`)
    .then(resp => resp.json())
    .then(({ rates }) => rates)
);

export default getRates;

