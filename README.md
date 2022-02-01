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

#Activity
- A code was merged to master and I got a callback in my hook.
- In my hook code I run my step function and run the following command to wait for event in the activity (lets say ApprovalListener). 
aws stepfunctions get-activity-task --activity-arn arn:aws:states:ap-southeast-1:135129372575:activity:po-approval
- As soon as my step function reaches this State, it publishes a token in the activity queue(I need to wait until then) and the blocking call returns. I need to save the token with the execution id/git commit or some other unique id. Now when user clicks approval in the UI, I need to pass the result to the step function activity and based on that I should deploy or halt.
```
aws stepfunctions get-activity-task --activity-arn arn:aws:states:ap-southeast-1:135129372575:activity:po-approval
{
    "taskToken": "AAAAKgAAAAIAAAAAAAAAAd4RXIcHXThLP1Z9Kyl2fqq+qXvoUlcdRybiVWFF/vwJEE8Vjkr+kPpMc4rc6VA1ZSyjdIp5rq3Jrsarnwr5QK6R0dfJ0daEAOk35Ejn+W2AHx92uC/38t0f6IZEKLMW6obuc0hqDZhBxvq94OzkknE0QKB3Gizc6XUH0IwnI9irkMzO2oV7kgFlVqRrITm0INoOmL1bEHKqtKaH54S3MfkXT559AUYOKsCwHnQMvxZeNlr0pKFBTvgqpB15ghlX+yXDNVLEz+EvtbeYYhgaTg7mAh6JLF5E/30UeYPlwvpD4mw9SCZPDg6HDTs/346wsA/WB9q3zvS3HfuEBkMR4p+kkWbfmmYFlqLLCYYl6jnKbPQ4+Lx1ZOB57TEUMS3P4q0o3BdI33smZkp5M49LOU1tMjWMoVkReNieJXaOyIFhvqHzI5gysWgP2A2AvXUUiBIJtuDMsQea9ChEgiM3yI5YUAwSsvYJXK414CU8823KUJR4OYl8WxPAbwId9mUdHmi5U7my0wATq1hOO15BrRYMAv0bwIpyb6NsCAOMNVZB0MnZdkjGJB+bSxgqWqDpYw==",
    "input": "\"Code build complete!\""
}
```
Continuing with the approval

```
aws stepfunctions send-task-success --task-token "AAAAKgAAAAIAAAAAAAAAAd4RXIcHXThLP1Z9Kyl2fqq+qXvoUlcdRybiVWFF/vwJEE8Vjkr+kPpMc4rc6VA1ZSyjdIp5rq3Jrsarnwr5QK6R0dfJ0daEAOk35Ejn+W2AHx92uC/38t0f6IZEKLMW6obuc0hqDZhBxvq94OzkknE0QKB3Gizc6XUH0IwnI9irkMzO2oV7kgFlVqRrITm0INoOmL1bEHKqtKaH54S3MfkXT559AUYOKsCwHnQMvxZeNlr0pKFBTvgqpB15ghlX+yXDNVLEz+EvtbeYYhgaTg7mAh6JLF5E/30UeYPlwvpD4mw9SCZPDg6HDTs/346wsA/WB9q3zvS3HfuEBkMR4p+kkWbfmmYFlqLLCYYl6jnKbPQ4+Lx1ZOB57TEUMS3P4q0o3BdI33smZkp5M49LOU1tMjWMoVkReNieJXaOyIFhvqHzI5gysWgP2A2AvXUUiBIJtuDMsQea9ChEgiM3yI5YUAwSsvYJXK414CU8823KUJR4OYl8WxPAbwId9mUdHmi5U7my0wATq1hOO15BrRYMAv0bwIpyb6NsCAOMNVZB0MnZdkjGJB+bSxgqWqDpYw==" --task-output '"output continue with approval"'
```

Continue with rejection - 
```
aws stepfunctions send-task-failure --task-token "AAAAKgAAAAIAAAAAAAAAAZNDbjCrvynJC9ltrQ+t7hKTH/YRxM1t/DrSu7zw3pVSdpYaqLJy9DDt/MK7hrroxVTZc6wi1EeQShqAl/Hed6Egb19No6JPOxCIwxADQ5ZIZrBRi9Y3/LYHYg65tJGSJM+jerc1fyv5rkQxqn8HDwBxPl8nYYP2Q+Y4eQdW9a50W4S2Vd5ggj0B7NNm2YL3T4WwZyC3NGC2wWXEHOTML6YNkmudeT+ZIxZivrxWHi/8eS6fUSftF0m346B06+Z3CzDvAXN2LUai+PQbnp+4UBNyLo0Dsd04xNpLDGWnen/cZ89urAdMub18tfNaX2gkjwRytqHzFvKcL7p3R+VSyJnztn5L09ooR12OFokb1vWYUKbiqbLPG4lMY6K0oQYCBobEz8u73YBjKnIUmhg85RGaUDk86pcbwSo3smh8wGebBVwugKlvqoh4MBU4dU6L8nFJ7wSLsvCkuLBrXT5+nTi0Q103j4VohzEan0M9Zwp5I7lsmP330VFOstEC9MyHJiO6WeOC/KG5mnk3k0PILfiERy0z14mbAPgk9NIcekj9CM5fGi6GtJtmFJIPjZPcXg==" --error 'RejectedByUser' --cause 'The code is buggy and it will unstablize the production'
```
