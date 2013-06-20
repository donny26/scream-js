
var ScreamProcess = require('./../lib/scream-process');
var path = require('path');
require('should');
var fs = require('fs');


var fileExists = function (filename) {
  try {
      stats = fs.lstatSync(filename);
      return true;
  } catch (e) {
      return false;
  }
};

describe('Build process',function(){

  it('should build test config', function(done){
    this.timeout(1000*20);
    var cmd = path.join(__dirname, "/../start-build.sh"); 
    var proc = new ScreamProcess("sh");
    proc.execute([cmd], function(cmd, exitCode) {
      exitCode.should.equal(0);
      done();
    });
  });

  it('should have created CSS files', function(done){
      var css = path.join(__dirname, "/../www-root/assets/css/scream/");
      fileExists(path.join(css, "scream.css")).should.be.true;
      fileExists(path.join(css, "scream-js.css")).should.be.true;
      done();
  });

  it('should have created image files', function(done){
      var img = path.join(__dirname, "/../www-root/assets/images/scream/");
      fileExists(path.join(img, "sprite__gui-background.png")).should.be.true;
      fileExists(path.join(img, "sprite__page-background.png")).should.be.true;
      fileExists(path.join(img, "brand-inverted-watermarked-nodejs-32.png")).should.be.true;
      done();
  });

});