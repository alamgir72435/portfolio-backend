const mongoose = require("mongoose");
const keys = require("./keys")
const _db_connection = async() => {
   try {
    const conn = await mongoose.connect(keys.uri, {
        useUnifiedTopology:true,
        useFindAndModify:false,
        useNewUrlParser:true
    })

    console.log(`mongoodb Connected with ${conn.connections[0].host}`)
   } catch (error) {
       console.log(error)
       process.exit(1)
   }
}

module.exports = _db_connection