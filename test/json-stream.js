
var jstream = require('jstream');
var spawn = require('child_process').spawn;
var assert = require('better-assert');

describe('up --json-stream', function(){
  it('should stream events', function(done){
    var parser = jstream('*');
    var proc = spawn('bin/up', ['--json-stream', 'bin/up']);
    proc.stdout.pipe(parser);
    parser.on('data', function(e){
      var type = e[0];
      var obj = e[1];
      switch (type) {
        case 'collection saved':
          assert(obj.title);
          assert(obj.uid);
          assert(obj.url);
          break;
        case 'item progress':
          assert('number' == typeof obj.total);
          assert('number' == typeof obj.sent);
          assert('number' == typeof obj.remaining);
          assert('number' == typeof obj.percent);
          break;
        case 'item saved':
          assert(obj.uid);
          assert(obj.title);
          assert(obj.filename);
          assert(obj.created_at);
          assert(obj.updated_at);
          assert(obj.remote);
          break;
        case 'end':
          done();
      }
    });
  })
})
