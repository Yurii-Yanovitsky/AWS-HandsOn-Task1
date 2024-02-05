const AWS = require("aws-sdk");

// Create a new instance of the AWS CloudWatch service
const cloudwatch = new AWS.CloudWatch();

// Log middleware to log requests to CloudWatch
const logRequestToCloudWatch = (req, res, next) => {
  const params = {
    MetricData: [
      {
        MetricName: "IndexPageRequest",
        Dimensions: [
          {
            Name: "PageName",
            Value: "index.html",
          },
        ],
        Unit: "Count",
        Value: 1,
      },
    ],
    Namespace: "Task1EC2App1",
  };

  cloudwatch.putMetricData(params, (err, data) => {
    if (err) {
      console.error("Error logging to CloudWatch: ", err);
    } else {
      console.log("Successfully logged to CloudWatch: ", data);
    }
  });

  next(); // Continue to the next middleware
};

exports.logRequestToCloudWatch = logRequestToCloudWatch;
