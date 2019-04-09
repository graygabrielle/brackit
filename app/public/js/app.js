const bracketId = 5;
const names = ["Rey", "Paprika", "Sharp", "Worm", "Andes"];
const name = names[Math.floor(Math.random() * names.length)];
let socket = io();

socket.emit('bracketID', bracketId, name);

socket.on('new join', (name) => {
    console.log(`${name} just joined!`);
    //add name to screen
})

socket.on('user left', (name) => {
    console.log(`${name} has left the room.`);
    //delete name from screen
})
socket.on('error', (err) => {
    console.log("Error connecting to room. Please wait for admin to enter.")
});