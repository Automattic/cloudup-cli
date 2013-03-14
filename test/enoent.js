
var exec = require('child_process').exec;
var assert = require('assert');

describe('up', function(){
  describe('with a missing file', function(){
    it('should output an error', function(done){
      exec('bin/up maru', function(err, stdout, stderr){
        assert(err);
        done();
      });
    })
  })
})
