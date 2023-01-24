const { deterministicPartitionKey, createHash } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the partitionKey of the event if it exists", () => {
    const event = { partitionKey: "123" };
    expect(deterministicPartitionKey(event)).toBe("123");
  });

  it("Create a sha3-512 hash of the event if partitionKey doesn't exist", () => {
    const event = { key: "value" };
    const hash = createHash(JSON.stringify(event));
    expect(deterministicPartitionKey(event)).toBe(hash);
  });

  it("Return a truncated partitionKey if it is greater than MAX_PARTITION_KEY_LENGTH", () => {
    const event = { partitionKey: "a".repeat(300) };
    const hash = createHash(event.partitionKey);
    expect(deterministicPartitionKey(event)).toBe(hash);
  });
});