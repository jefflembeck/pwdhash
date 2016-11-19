/*
 * Remote PwdHash
 * A JavaScript implementation of the PwdHash hashing algorithm.
 * Version 1.0 Copyright (C) Stanford University 2004-2006
 * Author: Collin Jackson
 * Other Contributors: Dan Boneh, John Mitchell, Nick Miyake, and Blake Ross
 * Distributed under the BSD License
 * See http://crypto.stanford.edu/PwdHash for more info.
 * Requires the Javascript MD5 library, available here: http://pajhome.org.uk/crypt/md5
 */

/*
 * Initialize page with default hashing parameters.
 */

var readline = require('readline');

var SPH_DomainExtractor = require('./lib/domain-extractor');
var SPH_HashedPassword = require('./lib/hashed-password');
var SPH_kPasswordPrefix = "@@";


var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('sigint', () => {
  rl.close();
});


rl.question('URL: ', function(uri){
  hidden('Password: ', function(pwd){
    console.log(Generate(uri, pwd));
    process.exit(0);
  });
});

/*
 * Returns a conforming hashed password generated from the form's field values.
 */
function Generate(uri, data)
{
  var domain = (new SPH_DomainExtractor()).extractDomain(uri);
  var size = SPH_kPasswordPrefix.length;
  if (data.substring(0, size) == SPH_kPasswordPrefix)
    data = data.substring(size);
  var result = "" + new SPH_HashedPassword(data, domain);
  return result;
}

function hidden (pw, cb) {
  const stdin = process.openStdin();
  var i = 0;

  process.stdin.on('data', char => {
    char = char + '';
    switch (char) {
      case '\n':
      case '\r':
      case '\u0004':
        stdin.pause();
        break;
      default:
        process.stdout.write("\033[2K\033[200D"+pw+"");
        i++;
        break;
    }
  });

  rl.question(pw, value => {
    rl.history = rl.history.slice(1);
    cb(value);
  })

}
