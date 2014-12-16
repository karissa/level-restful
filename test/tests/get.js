var request = require('request').defaults({json: true});
var debug = require('debug')('get')

module.exports.all = function (test, common) {
  test('GET', function (t) {

    var data = {
      'owner_id': 2,
      'name': 'test entry',
      'url': 'http://dat-data.dathub.org',
      'license': 'BSD-2'
     // 'keywords': ['entry', 'test', 'data', 'dathub']
    };

    common.testPOST(t, '/api/metadat', data,
      function (err, api, res, json, done) {
        t.ifError(err);
        t.equal(res.statusCode, 200, 'POST statusCode 200');
        t.ok(json, 'POST returns id')
        debug('id created', json);

        request('http://localhost:' + api.port + '/api/metadat/' + json,
          function (err, res, json) {
            t.ifError(err);
            t.equal(res.statusCode, 200, 'GET statusCode 200');
            data.id = json.id
            t.deepEqual(data, json, 'GET returns correct created data');
          }
        );

        request('http://localhost:' + api.port + '/api/metadat',
          function (err, res, json) {
            t.ifError(err);
            t.equal(res.statusCode, 200, 'GET statusCode 200');
            t.equal(json.length, 1, 'GET get correct object length back');
            done();
          }
        );
      }
    );

  });
};
