

const TCP_SOURCEPORT_OFFSET = 0;
const TCP_DESTINATIONPORT_OFFSET = 2;
const TCP_SEQUENCENUMBER_OFFSET = 4;
const TCP_ACKNUMBER_OFFSET = 8;
const TCP_FLAGS_OFFSET = 12;
const TCP_WINDOWSIZE_OFFSET = 14;
const TCP_CRC_OFFSET = 16;
const TCP_URGENTPOINTER_OFFSET = 18;

const TCP_FLAGS_FIN = 0x1
const TCP_FLAGS_SYN = 0x2
const TCP_FLAGS_RST = 0x4;
const TCP_FLAGS_PSH = 0x8;
const TCP_FLAGS_ACK = 0x10;
const TCP_FLAGS_URG = 0x20;

const TCP_HEADER_LENGTH = 20;

class TCPHeader {
    constructor(packet) {
        this._rawpacket = packet;
        this._parse();
    }

    _parse() {
        this._source = this._rawpacket.readUInt16BE(TCP_SOURCEPORT_OFFSET);
        this._destination = this._rawpacket.readUInt16BE(TCP_DESTINATIONPORT_OFFSET);
        this._seq = this._rawpacket.readUInt32BE(TCP_SEQUENCENUMBER_OFFSET);
        this._ack = this._rawpacket.readUInt32BE(TCP_ACKNUMBER_OFFSET);
        this._flag = [0,0];
        this._flag[0] = this._rawpacket.readUInt8(TCP_FLAGS_OFFSET);
        this._flag[1] = this._rawpacket.readUInt8(TCP_FLAGS_OFFSET + 1);
        this._window = this._rawpacket.readUInt16BE(TCP_WINDOWSIZE_OFFSET);
        this._crc = this._rawpacket.readUInt16BE(TCP_CRC_OFFSET);
        this._urgent = this._rawpacket.readUInt16BE(TCP_URGENTPOINTER_OFFSET);
        let hl = this.headerLength;
        if (hl > TCP_HEADER_LENGTH) {
            this._options = this._rawpacket.slice(TCP_HEADER_LENGTH, hl);
        }
        this._data = this._rawpacket.slice(hl);
    }

    get source() {
        return this._source;
    }

    get destination() {
        return this._destination;
    }

    get seq() {
        return this._seq;
    }

    get ack() {
        return this._ack;
    }

    get headerLength() {
        let hl = 4 * ((this._flag[0] & 0xF0) >> 4);
        return hl;
    }

    get flags() {
        let f = this._flag[1] | ((this._flag[0] & 0x1) << 8);
        return {
            SYN: f & TCP_FLAGS_SYN ? 1 : 0,
            ACK: f & TCP_FLAGS_ACK ? 1 : 0,
            FIN: f & TCP_FLAGS_FIN ? 1 : 0,
            RST: f & TCP_FLAGS_RST ? 1 : 0,
            PSH: f & TCP_FLAGS_PSH ? 1 : 0,
            URG: f & TCP_FLAGS_URG ? 1 : 0
        };
    }
  
    get options() {
        return this._options;
    }

    get window() {
       return this._window;
    }

    get crc() {
       return this._crc;
    }

    get urgent() {
       return this._urgent;
    }

    get data() {
       return this._data;
    }

    get length() {
        return this.data.length;
    }

    toJSON() {
        return {
            source: this.source,
            destination: this.destination,
            seq: this.seq,
            ack: this.ack,
            headerLength: this.headerLength,
            flags: this.flags,
            window: this._window,
            crc: this.crc,
            urgent: this.urgent,
            length: this.length,
            options: this.options,
            data: this.data
        };
    }
}

module.exports = TCPHeader;
