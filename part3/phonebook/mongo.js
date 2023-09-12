const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Please provide the password");
  process.exit(1);
}

const url = `mongodb+srv://hanznathanpo:${process.argv[2]}@cluster0.2phlmog.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
} else if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log("phonebook:")
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
}
else {
  console.log("Invalid input. Please try again.");
  process.exit(1);
}
