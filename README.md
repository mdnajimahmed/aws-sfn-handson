# aws-sfn-handson
A repo to do hands on with aws sfn

sls invoke stepf --name hello --data '"Najim"'

sls invoke stepf --name method-chaining-math --data  '{ "firstNumber": 1, "secondNumber":2 }'
// Error case
sls invoke stepf --name method-chaining-math --data  '{ "firstNumber": 17, "secondNumber":13 }'


sls invoke stepf --name parallel-poc --data  '{ "firstNumber": 17, "secondNumber":3 ,"userId":1}'

sls invoke stepf --name all-about-pass --data  '{ "x": 1, "y":2}'
sls invoke stepf --name map-simple --data  '[{ "delay": 2},{ "delay": 3},{ "delay": 1}]'

sls invoke stepf --name map-advanced --data  '{"inputs":[2,3,1],"groupdId":42}'