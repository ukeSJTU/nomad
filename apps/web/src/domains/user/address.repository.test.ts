import { describe, expect, it } from "vitest";
import { createUser } from "@/tests/integration/helpers/factories";

import {
  cancelDefaultAddress,
  createAddress,
  deleteAddress,
  getAddressById,
  getUserAddresses,
  setDefaultAddress,
  updateAddress,
} from "./address.repository";

describe("address.repository", () => {
  it("creates an address and sets it as default if it's the first one", async () => {
    const user = await createUser();

    const address = await createAddress({
      userId: user.id,
      recipientName: "Test User",
      phoneNumber: "13800000000",
      province: "Beijing",
      city: "Beijing",
      district: "Chaoyang",
      detailAddress: "Test Address",
      isDefault: false, // Explicitly false, but should become true
    });

    expect(address.isDefault).toBe(true);

    const addresses = await getUserAddresses(user.id);
    expect(addresses).toHaveLength(1);
    expect(addresses[0].id).toBe(address.id);
  });

  it("handles multiple addresses and default switching", async () => {
    const user = await createUser();

    const addr1 = await createAddress({
      userId: user.id,
      recipientName: "User 1",
      phoneNumber: "13800000001",
      province: "Beijing",
      city: "Beijing",
      district: "Chaoyang",
      detailAddress: "Address 1",
    });

    expect(addr1.isDefault).toBe(true);

    const addr2 = await createAddress({
      userId: user.id,
      recipientName: "User 2",
      phoneNumber: "13800000002",
      province: "Shanghai",
      city: "Shanghai",
      district: "Pudong",
      detailAddress: "Address 2",
      isDefault: true, // Set as default
    });

    expect(addr2.isDefault).toBe(true);

    // Re-fetch addr1 to check it's no longer default
    const updatedAddr1 = await getAddressById(addr1.id);
    expect(updatedAddr1?.isDefault).toBe(false);

    const addresses = await getUserAddresses(user.id);
    expect(addresses).toHaveLength(2);
    // Default address should come first
    expect(addresses[0].id).toBe(addr2.id);
  });

  it("updates an address", async () => {
    const user = await createUser();
    const addr = await createAddress({
      userId: user.id,
      recipientName: "Old Name",
      phoneNumber: "13800000000",
      province: "Beijing",
      city: "Beijing",
      district: "Chaoyang",
      detailAddress: "Old Address",
    });

    const updated = await updateAddress(addr.id, user.id, {
      recipientName: "New Name",
    });

    expect(updated?.recipientName).toBe("New Name");
    expect(updated?.id).toBe(addr.id);
  });

  it("sets default address correctly", async () => {
    const user = await createUser();
    const addr1 = await createAddress({
      userId: user.id,
      recipientName: "User 1",
      phoneNumber: "13800000001",
      province: "Beijing",
      city: "Beijing",
      district: "Chaoyang",
      detailAddress: "Address 1",
    });
    const addr2 = await createAddress({
      userId: user.id,
      recipientName: "User 2",
      phoneNumber: "13800000002",
      province: "Shanghai",
      city: "Shanghai",
      district: "Pudong",
      detailAddress: "Address 2",
      isDefault: false,
    });

    // Initially addr1 is default (first created)
    expect((await getAddressById(addr1.id))?.isDefault).toBe(true);
    expect((await getAddressById(addr2.id))?.isDefault).toBe(false);

    await setDefaultAddress(addr2.id, user.id);

    expect((await getAddressById(addr1.id))?.isDefault).toBe(false);
    expect((await getAddressById(addr2.id))?.isDefault).toBe(true);
  });

  it("cancels default address", async () => {
    const user = await createUser();
    const addr = await createAddress({
      userId: user.id,
      recipientName: "User 1",
      phoneNumber: "13800000001",
      province: "Beijing",
      city: "Beijing",
      district: "Chaoyang",
      detailAddress: "Address 1",
      isDefault: true,
    });

    expect(addr.isDefault).toBe(true);

    await cancelDefaultAddress(addr.id, user.id);

    const updated = await getAddressById(addr.id);
    expect(updated?.isDefault).toBe(false);
  });

  it("deletes an address", async () => {
    const user = await createUser();
    const addr = await createAddress({
      userId: user.id,
      recipientName: "User 1",
      phoneNumber: "13800000001",
      province: "Beijing",
      city: "Beijing",
      district: "Chaoyang",
      detailAddress: "Address 1",
    });

    await deleteAddress(addr.id, user.id);

    const found = await getAddressById(addr.id);
    expect(found).toBeUndefined();
  });
});
