
var exec = require('child_process').exec;
var assert = require('better-assert');

describe('up --json', function(){
  it('should output json', function(done){
    exec('bin/up --json bin/up', function(err, stdout, stderr){
      assert(!err);
      var obj = JSON.parse(stdout);
      assert(obj.id);
      assert(obj.title);
      assert(obj.items);
      assert(1 == obj.items.length);
      assert(obj.items[0].id);
      assert(obj.items[0].title);
      assert(obj.items[0].filename);
      assert(obj.items[0].created_at);
      assert(obj.items[0].updated_at);
      assert(obj.items[0].remote);
      done();
    });
  })
})
