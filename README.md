# aws-sfn-handson
A repo to do hands on with aws sfn

sls invoke stepf --name hello --data '"Najim"'

sls invoke stepf --name method-chaining-math --data  '{ "firstNumber": 1, "secondNumber":2 }'
// Error case
sls invoke stepf --name method-chaining-math --data  '{ "firstNumber": 17, "secondNumber":13 }'