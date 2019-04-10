const bracketId = 5;
const names = [
  "Rey",
  "Paprika",
  "Sharp",
  "Worm",
  "Andes",
  "Myrna",
  "Hyacinth",
  "Aether"
];
const name = names[Math.floor(Math.random() * names.length)];
let numberOfCandidates = 16;
let roundNumber = 1;

let socket = io();

socket.emit("bracketID", bracketId, name);

socket.on("new join", name => {
  console.log(`${name} just joined!`);
  //add name to screen
});

socket.on("user left", name => {
  console.log(`${name} has left the room.`);
  //delete name from screen
});

//on start button click
socket.emit("start braket"), numberOfCandidates;

socket.on("start round", roundNumber => {
  //get request - bracket page
  //round whatever
  //set interval 1000 seconds 5 passes for each pair
});

socket.on("error", err => {
  console.log("Error connecting to room. Please wait for admin to enter.");
});