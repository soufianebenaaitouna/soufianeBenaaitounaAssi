const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const createHash = (data) => crypto.createHash("sha3-512").update(data).digest("hex");

const deterministicPartitionKey = (event) => {

  if (!event) return TRIVIAL_PARTITION_KEY;

  let partitionKey = event.partitionKey || JSON.stringify(event);

  partitionKey = typeof partitionKey !== "string" ? JSON.stringify(partitionKey) : partitionKey;

  return partitionKey.length > MAX_PARTITION_KEY_LENGTH ? createHash(partitionKey) : partitionKey;
};

module.exports = {deterministicPartitionKey, createHash};