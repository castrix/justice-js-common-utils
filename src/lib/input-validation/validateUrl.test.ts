/*
 * Copyright (c) 2019. AccelByte Inc. All Rights Reserved
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { validateUrl, ValidateUrlErrorType } from "./validateUrl";

const mockValidateUrl = jest.fn(validateUrl);
afterEach(mockValidateUrl.mockClear);
afterAll(mockValidateUrl.mockRestore);

describe("validateUrl returns correct output", () => {
  it("returns empty error string when given empty string, but it is not a required field", () => {
    mockValidateUrl("", { isRequired: false });
    expect(mockValidateUrl).toHaveBeenCalledTimes(1);
    expect(mockValidateUrl).toHaveReturnedWith(null);
  });

  it("returns empty error string when given valid url format with query params", () => {
    mockValidateUrl("https://accelbyte.io?queryParam=value");
    expect(mockValidateUrl).toHaveBeenCalledTimes(1);
    expect(mockValidateUrl).toHaveReturnedWith(null);
  });

  it("returns empty error string when given valid localhost url format", () => {
    mockValidateUrl("http://localhost:3000/player");
    expect(mockValidateUrl).toHaveBeenCalledTimes(1);
    expect(mockValidateUrl).toHaveReturnedWith(null);
  });

  it("returns empty error string when given valid localhost IP url format", () => {
    mockValidateUrl("http://127.0.0.1:3000/player");
    expect(mockValidateUrl).toHaveBeenCalledTimes(1);
    expect(mockValidateUrl).toHaveReturnedWith(null);
  });

  it("returns empty error string when given PSN orbis url format", () => {
    mockValidateUrl("orbis://games");
    expect(mockValidateUrl).toHaveBeenCalledTimes(1);
    expect(mockValidateUrl).toHaveReturnedWith(null);
  });

  it("returns error string 'empty' when given empty string", () => {
    mockValidateUrl("");
    expect(mockValidateUrl).toHaveBeenCalledTimes(1);
    expect(mockValidateUrl).toHaveReturnedWith(ValidateUrlErrorType.empty);
  });

  it("returns error string 'exceedLengthLimit' when given valid url but exceeds default length (2000)", () => {
    mockValidateUrl(
      // tslint:disable-next-line
      "https://accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyteaccelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyteaccelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyteaccelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyteaccelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyteaccelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyteaccelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyteaccelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbyte.accelbytee"
    );
    expect(mockValidateUrl).toHaveBeenCalledTimes(1);
    expect(mockValidateUrl).toHaveReturnedWith(ValidateUrlErrorType.exceedLengthLimit);
  });

  it("returns error string 'invalidFormat' when given valid localhost url format without protocol", () => {
    mockValidateUrl("localhost:3000/player");
    expect(mockValidateUrl).toHaveBeenCalledTimes(1);
    expect(mockValidateUrl).toHaveReturnedWith(ValidateUrlErrorType.invalidFormat);
  });

  it("returns error string 'invalidFormat' when given valid localhost IP url format without protocol", () => {
    mockValidateUrl("127.0.0.1:3000/player");
    expect(mockValidateUrl).toHaveBeenCalledTimes(1);
    expect(mockValidateUrl).toHaveReturnedWith(ValidateUrlErrorType.invalidFormat);
  });

  it("returns error string 'invalidFormat' when given url that potentially do insecure URL redirects", () => {
    mockValidateUrl("http://www.target.site?#redirect=www.fake-target.site");
    expect(mockValidateUrl).toHaveBeenCalledTimes(1);
    expect(mockValidateUrl).toHaveReturnedWith(ValidateUrlErrorType.invalidFormat);
  });

  it("returns error string 'invalidFormat' when given url that potentially do command injection", () => {
    mockValidateUrl("http://sensitive/something.php?dir=;cat /etc/passwd");
    expect(mockValidateUrl).toHaveBeenCalledTimes(1);
    expect(mockValidateUrl).toHaveReturnedWith(ValidateUrlErrorType.invalidFormat);
  });

  it("returns error string 'invalidFormat' when given custom protocol", () => {
    mockValidateUrl("example-protocol://example.net/something");
    expect(mockValidateUrl).toHaveBeenCalledTimes(1);
    expect(mockValidateUrl).toHaveReturnedWith(ValidateUrlErrorType.invalidFormat);
  });

  it("returns empty error when given custom protocol, but it is allow custom protocol", () => {
    mockValidateUrl("example-protocol://example.net/something", { allowCustomProtocol: true });
    expect(mockValidateUrl).toHaveBeenCalledTimes(1);
    expect(mockValidateUrl).toHaveReturnedWith(null);
  });

  it("returns empty error when given only custom protocol, it is allow custom protocol", () => {
    mockValidateUrl("example-protocol://", { allowCustomProtocol: true });
    expect(mockValidateUrl).toHaveBeenCalledTimes(1);
    expect(mockValidateUrl).toHaveReturnedWith(null);
  });

  // tslint:disable-next-line
  it("returns error string 'invalidFormat' when given not allowed symbol on custom protocol, it is allow custom protocol", () => {
    mockValidateUrl("example|protocol=string_string*://example.net/something", { allowCustomProtocol: true });
    expect(mockValidateUrl).toHaveBeenCalledTimes(1);
    expect(mockValidateUrl).toHaveReturnedWith(ValidateUrlErrorType.invalidFormat);
  });
});
