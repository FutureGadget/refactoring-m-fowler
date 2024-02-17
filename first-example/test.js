const statement = require('./bills');

describe('statement', () => {
    // Calculates the total amount owed for a tragedy play with an audience of 30 or less
    it('should calculate the total amount owed for a tragedy play with an audience of 30 or less', () => {
      const invoice = {
        customer: "John Doe",
        performances: [
          {
            playID: "hamlet",
            audience: 30
          }
        ]
      };
      const plays = {
        hamlet: {
          name: "Hamlet",
          type: "tragedy"
        }
      };
      const result = statement(invoice, plays);
      expect(result).toBe("Statement for John Doe\n  Hamlet: $400.00 (30 seats)\nAmount owed is $400.00\nYou earned 0 credits\n");
    });

    it('should calculate the total amount owed for a tragedy play with an audience of more than 30', () => {
      const invoice = {
        customer: "John Doe",
        performances: [
          {
            playID: "hamlet",
            audience: 40
          }
        ]
      };
      const plays = {
        hamlet: {
          name: "Hamlet",
          type: "tragedy"
        }
      };
      const result = statement(invoice, plays);
      expect(result).toBe("Statement for John Doe\n  Hamlet: $500.00 (40 seats)\nAmount owed is $500.00\nYou earned 10 credits\n");
    });

    // Calculates the total amount owed for a comedy play with an audience of 20 or less
    it('should calculate the total amount owed for a comedy play with an audience of 20 or less', () => {
      const invoice = {
        customer: "John Doe",
        performances: [
          {
            playID: "as-you-like-it",
            audience: 20
          }
        ]
      };
      const plays = {
        "as-you-like-it": {
          name: "As You Like It",
          type: "comedy"
        }
      };
      const result = statement(invoice, plays);
      expect(result).toBe("Statement for John Doe\n  As You Like It: $360.00 (20 seats)\nAmount owed is $360.00\nYou earned 4 credits\n");
    });

    // Calculates the total amount owed for a comedy play with an audience of more than 20
    it('should calculate the total amount owed for a comedy play with an audience of more than 20', () => {
      const invoice = {
        customer: "John Doe",
        performances: [
          {
            playID: "as-you-like-it",
            audience: 30
          }
        ]
      };
      const plays = {
        "as-you-like-it": {
          name: "As You Like It",
          type: "comedy"
        },
      };
      const result = statement(invoice, plays);
      expect(result).toBe("Statement for John Doe\n  As You Like It: $540.00 (30 seats)\nAmount owed is $540.00\nYou earned 6 credits\n");
    });

    // Calculates the total amount owed for a comedy play with an audience of more than 20
    it('should calculate the total amount owed for a comedy and tragedy play more than 20 and 30, respectively', () => {
      const invoice = {
        customer: "John Doe",
        performances: [
          {
            playID: "as-you-like-it",
            audience: 25
          },
          {
            playID: "hamlet",
            audience: 35
          }
        ]
      };
      const plays = {
        "as-you-like-it": {
          name: "As You Like It",
          type: "comedy"
        },
        "hamlet": {
          name: "Hamlet",
          type: "tragedy"
        }
      };
      const result = statement(invoice, plays);
      expect(result).toBe("Statement for John Doe\n  As You Like It: $500.00 (25 seats)\n  Hamlet: $450.00 (35 seats)\nAmount owed is $950.00\nYou earned 10 credits\n");
    });

    // Throws an error for an unknown play type
    it('should throw an error for an unknown play type', () => {
      const invoice = {
        customer: "John Doe",
        performances: [
          {
            playID: "hamlet",
            audience: 30
          }
        ]
      };
      const plays = {
        "hamlet": {
          name: "Hamlet",
          type: "what-is-this"
        }
      };
      expect(() => {
        statement(invoice, plays);
      }).toThrowError("unknown type: what-is-this");
    });

    // Returns a string with the statement for an empty invoice
    it('should return a string with the statement for an empty invoice', () => {
      const invoice = {
        customer: "John Doe",
        performances: []
      };
      const plays = {};
      const result = statement(invoice, plays);
      expect(result).toBe("Statement for John Doe\nAmount owed is $0.00\nYou earned 0 credits\n");
    });

    // Returns a string with the statement for a zero audiences
    it('should return a string with the statement for zero audiences', () => {
      const invoice = {
        customer: "John Doe",
        performances: [
          {
            playID: "hamlet",
            audience: 0
          },
          {
            playID: "as-like",
            audience: 0
          }
        ]
      };
      const plays = {
        "hamlet": {
          name: "Hamlet",
          type: "tragedy"
        },
        "as-like": {
          name: "As You Like It",
          type: "comedy"
        }
      };
      const result = statement(invoice, plays);
      expect(result).toBe("Statement for John Doe\n  Hamlet: $400.00 (0 seats)\n  As You Like It: $300.00 (0 seats)\nAmount owed is $700.00\nYou earned 0 credits\n");
    });
});
