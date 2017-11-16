var http = require("http");
var PORTTWO = 7001;
function handleRequestOne(request, response) {
  response.end("Route one");
}
function handleRequestTwo(request, response) {
  response.end("Route two");
}
var serverOne = http.createServer(handleRequestOne);
var serverTwo = http.createServer(handleRequestTwo);
var PORTONE = 7000;
serverOne.listen(7000, function() {
  console.log("Server listening on: http://localhost:" + PORTONE);
});
serverTwo.listen(PORTTWO, function() {
  console.log("Server listening on: http://localhost:" + PORTTWO);
});
