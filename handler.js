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
  return n * n
};
