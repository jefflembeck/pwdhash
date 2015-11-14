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

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var SPH_DomainExtractor = require('./lib/domain-extractor');
var SPH_HashedPassword = require('./lib/hashed-password');
var SPH_kPasswordPrefix = "@@";

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


rl.question('URL: ', function(uri){
  rl.question('Password: ', function(pwd){
    console.log(Generate(uri, pwd));
    process.exit(0);
  });
});

