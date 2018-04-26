# ip-header

TCP header parsing.

## Example

```javascript
var TCPHeader = require('tcp-header');

// parse a TCP header from buffer
var tcph = new TCPHeader(buf);
tcph.source === 34567;          // source port
tcph.destination === 80;        // destination port
tcph.seq === 1234557;           // tcp sequence number
tcph.ack === 7654321;           // tcp ack number
tcph.headerLength === 20;       // tcp header length
tcph.flags === { SYN: 0, ACK: 1, FIN: 0, RST: 0, PSH: 1, URG: 0 };               // tcp flags
tcph.window === 64;             // time-to-live
tcph.crc === 12134;             // payload protocol
tcp.length === 3                // tcp data length
tcp.options === <Buffer 01 01 08 0a 04 61 42 35 c4 40 ed 87> // tcp options buffer
tcp.data === <Buffer fe 00 0e 00? //tcp data buffer
tcp.toJSON() === { 
  source: 9000,
  destination: 34957,
  seq: 897772806,
  ack: 1362897930,
  headerLength: 32,
  flags: { SYN: 0, ACK: 1, FIN: 0, RST: 0, PSH: 1, URG: 0 },
  window: 7776,
  crc: 55700,
  urgent: 0,
  length: 538,
  options: <Buffer 01 01 08 0a 04 61 42 35 c4 40 ed 87>,
  data: <Buffer fe 00 0e 00 01 40 01 02 1f 02 76 3d 30 0d 0a 6f 3d 2d 20 30 20 30 20 49 4e 20 49 50 34 20 31 30 2e 31 33 31 2e 31 32 32 2e 32 30 32 0d 0a 73 3d 56 69 ... > 
}
```

## Limitations

* options are not parsed currently.
* crc is not verified
