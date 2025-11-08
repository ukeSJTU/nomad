import { Factory } from "fishery";

/**
 * User type based on Better Auth schema
 */
type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  phoneNumber: string | null;
  phoneNumberVerified: boolean | null;
};

/**
 * Factory for creating test users
 *
 * Usage:
 * - userFactory.build() - Create a user object (not inserted to DB)
 * - userFactory.build({ email: 'custom@test.com' }) - Override specific fields
 */
export const userFactory = Factory.define<User>(({ sequence }) => ({
  id: `user-${sequence}`,
  name: `Test User ${sequence}`,
  email: `user${sequence}@test.com`,
  emailVerified: true,
  image: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  phoneNumber: null,
  phoneNumberVerified: null,
}));

/**
 * Factory for creating unverified users
 */
export const unverifiedUserFactory = userFactory.params({
  emailVerified: false,
  phoneNumberVerified: false,
});

/**
 * Factory for creating users with phone numbers
 */
export const userWithPhoneFactory = userFactory.params({
  phoneNumber: "13800138000",
  phoneNumberVerified: true,
});
