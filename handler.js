const axios = require('axios');

class NumberIsTooBig extends Error{
  constructor(n){
    super(`${n} is too big`)
    this.name = 'NumberIsTooBig'
    Error.captureStackTrace(this,NumberIsTooBig)
  }
}

module.exports.hello = async (name) => { // what object I pass
  return `Hello ${name}`
};
module.exports.add = async ({ firstNumber, secondNumber }) => { // what object I pass
  return { // what I return will be passed to function double, thats why function double looks like {result}
    result: firstNumber + secondNumber
  }
};
module.exports.double = async ({ result }) => { // what object returned by the previous object

  return result * 2
};
module.exports.square = async (n) => { // what object returned by the previous object
  if(n>50){
    throw new NumberIsTooBig(n);
  }
  return `The normal square is ${n * n}`
};

module.exports.bigSquare = async (n) => { // what object returned by the previous object
  return `The big square is ${n * n}`
};

module.exports.finalize = async (input) => { // what object returned by the previous object
  console.log(input)
  return input
};

module.exports.fetchUsers = async ({userId}) => {
  
  const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
  console.log("response",response,typeof response)
  return response.data
};

module.exports.fetchTodos = async ({userId}) => { 
  const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)
  console.log("response",response,typeof response)
  return response.data
};

module.exports.apiGatewayTrigger = async (event) => { 
  console.log("event",event)
  return event
};
module.exports.s3FileUploadTrigger = async (event) => { 
  console.log("event",event)
  return event
};

