import { VerifyEmailPage } from "./verify-email.page"

describe('VerifyEmailPage',  () => {
  let fixture: VerifyEmailPage;
  let VerifyEmailPageMock;
  let AuthenticationServiceMock;
  let RouterMock;

  beforeEach( () => {
    fixture = new VerifyEmailPage(
      AuthenticationServiceMock,
      RouterMock
    );


  });

  describe('addNumbers', () => {
    it( 'should 1 + 2 egale 3', () => {

      const result = fixture.addNumbers(1, 2);

      expect(result).toEqual(3);
    });

  });

});