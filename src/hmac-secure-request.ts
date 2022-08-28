import fetch, { RequestInfo, RequestInit } from 'node-fetch';
import { createHmac } from 'crypto';

interface SendDataParams {
  url: string;
  data: any;
  secret: string;

}

export const sendData = async ({ url, data, secret }: SendDataParams) => {
  const stringifiedData = JSON.stringify(data);
  const signature = createHmac('sha256', secret).update(stringifiedData).digest('hex');
  const body = JSON.stringify({
    signature,
    data,
  });
  const response = await fetch(url, {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  });
  return await response.json();
}

interface verifyDataParams {
  data: any,
  secret: string,
  signature: string
  debug?: boolean;
}
export const verifyData = ({ data, secret, signature, debug = false }: verifyDataParams) => {
  const stringifiedData = JSON.stringify(data);
  const digest = createHmac('sha256', secret).update(stringifiedData).digest('hex');
  debug && console.log(`digest: ${digest}`);
  return digest === signature;
}
