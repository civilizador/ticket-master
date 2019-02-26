const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
  // Configure chai
chai.use(chaiHttp);
chai.should();
 
//now let's login the user before we run any tests
 before(function(done){
  chai.request('http://localhost:8080')
              .post('/login')
              .set('Token', 'text/plain')
              .set('content-type', 'application/x-www-form-urlencoded')
              .type('form')
              .send('grant_type=password')
              .send('username=admin')
              .send('password=Asimssoft1')
    .end(function(err, response){
      expect(response.statusCode).to.equal(200);
      expect('Location', '/tickets');
      done();
    });
});


describe('/Routes Testing', () => {
    describe('/GET ROUTES and Login', () => {
        it('Should get to /tickets page', (done) => {
        chai.request('http://localhost:8080')
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                expect(res).to.redirectTo('http://localhost:8080/tickets');
                res.body.should.be.a('object');
              done();
            });
        });    
        it('should redirect to dashboard on successful login', function(done) {
            chai.request('http://localhost:8080')
              .post('/login')
              .set('Token', 'text/plain')
              .set('content-type', 'application/x-www-form-urlencoded')
              .type('form')
              .send('grant_type=password')
              .send('username=admin')
              .send('password=Asimssoft1')
              .end(function(err, res) {
                res.should.have.status(200);
                expect(res).to.redirectTo('http://localhost:8080/tickets');
                done();
              });
        });
        
        it('Should get to /tickets page', (done) => {
        chai.request('http://localhost:8080')
            .get('/tickets')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
              done();
            });
      });
      it('it should not POST a book without pages field', (done) => {
          var ticket = {
                created: {type: Date, default: Date.now},
                ticket: 'INC38374892347',
                fqdn:  'test.com',
                state: 'monitoring',
                carrier: 'testing carrier',
                owner: 'admin',
                last: 'TEST',
                next: 'TEST',
                author: 'admin',
                updated: 'test-test',
                group: 'test-test',
                images: 'sdsdsdsd',
                notes: 'sdsdsd',
             }
        chai.request('http://localhost:8080')
            .post('/tickets')
            .send(ticket)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                done();
            });
      });

          
    });  
});