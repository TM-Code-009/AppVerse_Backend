const dns = require("dns");

dns.resolveSrv(
  "_mongodb._tcp.admindb.t511qwr.mongodb.net",
  (err, records) => {
    if (err) {
      console.error(err);
    } else {
      console.log(records);
    }
  }
);