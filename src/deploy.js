import pinataSDK from '@pinata/sdk';
import path from 'path';

const pinata = pinataSDK(
  '2bbbff2547713f223174',
  '4de9df70ef38271738ed5fe9607c8344ca852dfd4576cfe3ecedee42fc2ea743'
);

const sourcePath = path.join(
  process.cwd(),
  './template/build'
);
const options = {
  pinataMetadata: {
    name: 'CRA from Docker',
  },
  pinataOptions: {
    cidVersion: 0,
  },
};

console.log('pinata', pinata);

pinata
  .pinFromFS(sourcePath, options)
  .then((result) => {
    console.log('Pinned!', result);
  })
  .catch((err) => console.log('Somethign went wrong', err));