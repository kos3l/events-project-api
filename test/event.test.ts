process.env.NODE_ENV = "test";
import chai, { should } from "chai";
const expect = chai.expect;
import chaiHttp from "chai-http";
import app from "../server";
import Response from "chai";
chai.use(chaiHttp);

describe("/First Test Collection/", () => {
  it("tests default api welcome route...", (done) => {
    chai
      .request(app)
      .get("/api/welcome")
      .end((err, res) => {
        should().exist(res);
        res.should.have.status(200);
        res.body.should.be.a("object");
        console.log(res.body.message);
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
});
