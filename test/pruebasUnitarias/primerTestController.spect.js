var chai = require('chai');
var response = require('mock-express-response');
var proxyquire = require('proxyquire').noCallThru();
var should = chai.should();
var expect = chai.expect;
var assert = require('assert');

describe('Prueba de primer test controller', function () {

    var check = function (done, f) {
        try {
            f();
            done();
        } catch (e) {
            done(e);
        }
    };
    let controller;
    before(function () {
        controller = proxyquire('../../app/controller/primerTestController', {
            'soap-client-bech': {
                strongSoapB9: function (url, soapHeader, soapBody, funcionWSDL) {
                    let promise = new Promise(function (resolve, reject) {
                        let retorno = {
                            result: {
                                key: 'value',
                                key1: 'value1'
                            }
                        }
                        resolve(retorno);
                    });

                    return promise;
                }
            }
        })
    });

    it('Prueba primerTestController correcto', function (done) {
        let res = new response();
        let req = {
            headers: {
                canal: 'HB'
            },
            params: {
                dvClient: '1',
                rutClient: '123123'
            }
        };
        controller.consultarTest(req, res);
        setTimeout(function () {
            check(done, function () {
                expect(res).to.have.a.property("statusCode", 200);
                var body = res._getJSON();
                console.log('*****************',body);
                expect(body).to.have.a.property("key", 'value');
            })
        }, 100)
    })
})