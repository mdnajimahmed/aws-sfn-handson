const axios = require("axios");
const AWS = require("aws-sdk");
const SFN = new AWS.StepFunctions();

class NumberIsTooBig extends Error {
  constructor(n) {
    super(`${n} is too big`);
    this.name = "NumberIsTooBig";
    Error.captureStackTrace(this, NumberIsTooBig);
  }
}

module.exports.hello = async (name) => {
  // what object I pass
  return `Hello ${name}`;
};
module.exports.add = async ({ firstNumber, secondNumber }) => {
  // what object I pass
  return {
    // what I return will be passed to function double, thats why function double looks like {result}
    result: firstNumber + secondNumber,
  };
};
module.exports.double = async ({ result }) => {
  // what object returned by the previous object

  return result * 2;
};
module.exports.square = async (n) => {
  // what object returned by the previous object
  if (n > 50) {
    throw new NumberIsTooBig(n);
  }
  return `The normal square is ${n * n}`;
};

module.exports.bigSquare = async (n) => {
  // what object returned by the previous object
  return `The big square is ${n * n}`;
};

module.exports.finalize = async (input) => {
  // what object returned by the previous object
  console.log(input);
  return input;
};

module.exports.fetchUsers = async ({ userId }) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  console.log("response", response, typeof response);
  return response.data;
};

module.exports.fetchTodos = async ({ userId }) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${userId}/todos`
  );
  console.log("response", response, typeof response);
  return response.data;
};

module.exports.apiGatewayTrigger = async (event) => {
  console.log("event", event);
  return event;
};
module.exports.s3FileUploadTrigger = async (event) => {
  console.log("event", event);
  return event;
};

module.exports.sqsListener = async (event) => {
  console.log("event", JSON.stringify(event));
  const record = event.Records[0];
  const body = JSON.parse(record.body);
  console.log("body", body);

  if (1 == 2) {
  }
  await SFN.sendTaskSuccess({
    output: JSON.stringify({
      temperature: 30.3,
      airPressure: 100.7,
    }),
    taskToken: body.Token,
  }).promise();
  return event;
};

module.exports.evaluationLambda = async (event) => {
  return "Approved";
};
