import fs from "fs";
import { BlobServiceClient } from "@azure/storage-blob";

const AZURE_STORAGE_CONNECTION_STRING =
  "DefaultEndpointsProtocol=https;AccountName=shirsample;AccountKey=AopuXSG9XixPDPljN7J4F+KOK1GtcCzSwzao/EjBuzwvVC/REYPHIaGNyQE5LEOMx0ucgZDs26/lVRDVL8mtBw==;EndpointSuffix=core.windows.net";

const getBlobName = (originalName) => {
  const identifier = Math.random().toString().replace(/0\./, "");
  return `${identifier}-${originalName}`;
};

export const uploadToAzureStorage = async (file) => {
  const blobServiceClient = await BlobServiceClient.fromConnectionString(
    AZURE_STORAGE_CONNECTION_STRING
  );
  const containerClient = await blobServiceClient.getContainerClient("samples");

  const buff = fs.readFileSync(file.path);
  const base64data = buff.toString("base64");

  const blobName = getBlobName(file.name);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  return blockBlobClient.upload(base64data, base64data.length);
};
