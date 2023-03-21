process.env.NODE_ENV = "test";
import { app } from "../server";
import chai, { should } from "chai";
import chaiHttp from "chai-http";
import { expect } from "chai";
import Event from "../models/schemas/EventSchema";
chai.use(chaiHttp);

before((done) => {
  Event.deleteMany({}, function (err) {});
  done();
});

after((done) => {
  Event.deleteMany({}, function (err) {});
  done();
});

describe("/First Test Collection/", () => {
  /*
  it("tests default api welcome route...", (done) => {
    chai
      .request(app)
      .get("/api/welcome")
      .end((err, res) => {
        should().exist(res);
        res.should.have.status(200);
        res.body.should.be.a("object");
        const actualVal = res.body.message;
        expect(actualVal).to.be.equal("Welcome to the MEN-REST-API");
        done();
      });
  });

  it("should test two values...", () => {
    // actual test content in here
    let expectedValue = 10;
    let actualVal = 10;

    expect(actualVal).to.be.equal(expectedValue);
  });
  */

  it("should verify that we have 0 products in the DB...", (done) => {
    chai
      .request(app)
      .get("/api/event")
      .end((err, res) => {
        should().exist(res);
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(0);
        done();
      });
  });

  it("should post a valid event..", (done) => {
    chai
      .request(app)
      .post("/api/event")
      .send([
        {
          title: "Rosolek",
          description: "jaaaa!",
          startDate: "2023-05-20 13:00:00.000",
          endDate: "2023-05-20 14:00:00.000",
          address: "Some street in Esbjerg",
        },
      ])
      .end((err, res) => {
        should().exist(res);
        res.should.have.status(200);
        res.body.should.be.an("object");
        done();
      });
  });

  it("should verify that we have 1 product in the DB...", (done) => {
    chai
      .request(app)
      .get("/api/event")
      .end((err, res) => {
        should().exist(res);
        res.should.have.status(200);
        res.body.should.be.an("array");
        res.body.length.should.be.eql(1);
        done();
      });
  });
});
