import { describe, expect, it } from "vitest";

import {
  ageSchema,
  emailSchema,
  type PasswordConfirm,
  passwordConfirmSchema,
  passwordSchema,
  roleSchema,
  statusSchema,
  stringToNumberSchema,
  tagsSchema,
  type User,
  usernameSchema,
  userSchema,
} from "./example";

describe("usernameSchema", () => {
  it("should accept valid usernames", () => {
    const validUsernames = ["user123", "test_user", "MyUsername", "abc"];

    validUsernames.forEach(username => {
      expect(() => usernameSchema.parse(username)).not.toThrow();
      expect(usernameSchema.parse(username)).toBe(username);
    });
  });

  it("should reject invalid usernames", () => {
    const invalidUsernames = [
      "", // empty
      "ab", // too short
      "a".repeat(21), // too long
      "user@name", // invalid character
      "user name", // space not allowed
      "user-name", // dash not allowed
    ];

    invalidUsernames.forEach(username => {
      expect(() => usernameSchema.parse(username)).toThrow();
    });
  });
});

describe("emailSchema", () => {
  it("should accept valid email addresses", () => {
    const validEmails = [
      "user@example.com",
      "test.email@domain.co.uk",
      "user+tag@example.org",
    ];

    validEmails.forEach(email => {
      expect(() => emailSchema.parse(email)).not.toThrow();
      expect(emailSchema.parse(email)).toBe(email);
    });
  });

  it("should reject invalid email addresses", () => {
    const invalidEmails = [
      "", // empty
      "invalid-email",
      "@example.com",
      "user@",
    ];

    invalidEmails.forEach(email => {
      expect(() => emailSchema.parse(email)).toThrow();
    });
  });
});

describe("passwordSchema", () => {
  it("should accept valid passwords", () => {
    const validPasswords = ["Password123", "MySecure1Pass", "Test123ABC"];

    validPasswords.forEach(password => {
      expect(() => passwordSchema.parse(password)).not.toThrow();
      expect(passwordSchema.parse(password)).toBe(password);
    });
  });

  it("should reject invalid passwords", () => {
    const invalidPasswords = [
      "", // empty
      "1234567", // too short
      "password", // no uppercase or number
      "PASSWORD123", // no lowercase
      "Password", // no number
    ];

    invalidPasswords.forEach(password => {
      expect(() => passwordSchema.parse(password)).toThrow();
    });
  });
});

describe("ageSchema", () => {
  it("should accept valid ages", () => {
    const validAges = [13, 25, 65, 120];

    validAges.forEach(age => {
      expect(() => ageSchema.parse(age)).not.toThrow();
      expect(ageSchema.parse(age)).toBe(age);
    });
  });

  it("should reject invalid ages", () => {
    const invalidAges = [12, 121, -5];

    invalidAges.forEach(age => {
      expect(() => ageSchema.parse(age)).toThrow();
    });
  });
});

describe("roleSchema", () => {
  it("should accept valid roles", () => {
    const validRoles = ["user", "admin", "moderator"];

    validRoles.forEach(role => {
      expect(() => roleSchema.parse(role)).not.toThrow();
      expect(roleSchema.parse(role)).toBe(role);
    });
  });

  it("should use default value", () => {
    const result = roleSchema.parse(undefined);
    expect(result).toBe("user");
  });

  it("should reject invalid roles", () => {
    const invalidRoles = ["guest", "superuser", ""];

    invalidRoles.forEach(role => {
      expect(() => roleSchema.parse(role)).toThrow();
    });
  });
});

describe("userSchema", () => {
  it("should accept valid user objects", () => {
    const validUser = {
      username: "testuser",
      email: "test@example.com",
      age: 25,
      role: "user" as const,
    };

    expect(() => userSchema.parse(validUser)).not.toThrow();

    const result: User = userSchema.parse(validUser);
    expect(result).toEqual(validUser);
  });

  it("should use default role when not provided", () => {
    const userWithoutRole = {
      username: "testuser",
      email: "test@example.com",
      age: 25,
    };

    const result = userSchema.parse(userWithoutRole);
    expect(result.role).toBe("user");
  });

  it("should reject invalid user objects", () => {
    const invalidUsers = [
      { username: "ab", email: "test@example.com", age: 25 }, // username too short
      { username: "testuser", email: "invalid-email", age: 25 }, // invalid email
      { username: "testuser", email: "test@example.com", age: 12 }, // age too low
    ];

    invalidUsers.forEach(user => {
      expect(() => userSchema.parse(user)).toThrow();
    });
  });
});

describe("tagsSchema", () => {
  it("should accept valid tag arrays", () => {
    const validTags = [
      ["tag1"],
      ["tag1", "tag2"],
      ["tag1", "tag2", "tag3", "tag4", "tag5"],
    ];

    validTags.forEach(tags => {
      expect(() => tagsSchema.parse(tags)).not.toThrow();
      expect(tagsSchema.parse(tags)).toEqual(tags);
    });
  });

  it("should reject invalid tag arrays", () => {
    const invalidTags = [
      [], // empty array
      ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6"], // too many tags
      [""], // empty tag
      ["tag1", ""], // contains empty tag
    ];

    invalidTags.forEach(tags => {
      expect(() => tagsSchema.parse(tags)).toThrow();
    });
  });
});

describe("statusSchema", () => {
  it("should accept valid status values", () => {
    const validStatuses = ["active", "inactive", "pending"];

    validStatuses.forEach(status => {
      expect(() => statusSchema.parse(status)).not.toThrow();
      expect(statusSchema.parse(status)).toBe(status);
    });
  });

  it("should reject invalid status values", () => {
    const invalidStatuses = ["unknown", "deleted", ""];

    invalidStatuses.forEach(status => {
      expect(() => statusSchema.parse(status)).toThrow();
    });
  });
});

describe("passwordConfirmSchema", () => {
  it("should accept matching passwords", () => {
    const validData = {
      password: "Password123",
      confirmPassword: "Password123",
    };

    expect(() => passwordConfirmSchema.parse(validData)).not.toThrow();

    const result: PasswordConfirm = passwordConfirmSchema.parse(validData);
    expect(result).toEqual(validData);
  });

  it("should reject non-matching passwords", () => {
    const invalidData = {
      password: "Password123",
      confirmPassword: "DifferentPassword123",
    };

    expect(() => passwordConfirmSchema.parse(invalidData)).toThrow();
  });
});

describe("stringToNumberSchema", () => {
  it("should transform valid string numbers", () => {
    const validStrings = ["1", "42", "100"];

    validStrings.forEach(str => {
      expect(() => stringToNumberSchema.parse(str)).not.toThrow();
      expect(stringToNumberSchema.parse(str)).toBe(parseInt(str, 10));
    });
  });

  it("should reject invalid string numbers", () => {
    const invalidStrings = ["0", "-1", "abc", ""];

    invalidStrings.forEach(str => {
      expect(() => stringToNumberSchema.parse(str)).toThrow();
    });
  });
});
