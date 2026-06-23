import { Transform } from 'stream';
import { MessagesBuilder } from '../../src/messages/MessagesBuilder.js';
export class MessagesBuilderStream extends Transform {
    constructor(errorHandler = () => undefined) {
        super({ objectMode: true });
        this.errorHandler = errorHandler;
        this.builder = new MessagesBuilder();
    }
    _transform(envelope, _, callback) {
        this.builder.processEnvelope(envelope, this.errorHandler);
        callback();
    }
    _flush(callback) {
        callback(null, this.builder.build());
    }
}
//# sourceMappingURL=MessagesBuilderStream.js.map