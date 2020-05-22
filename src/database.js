const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);

mongoose
  .connect("mongodb+srv://sergiorodas:sergiorodas1234@cluster0-qlkdz.mongodb.net/test?retryWrites=true&w=majority", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((db) => console.log("DB is connected"))
  .catch((err) => console.log(err));
