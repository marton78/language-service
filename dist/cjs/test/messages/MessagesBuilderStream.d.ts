import { Envelope } from '@cucumber/messages';
import { Transform, TransformCallback } from 'stream';
export declare class MessagesBuilderStream extends Transform {
    private readonly errorHandler;
    private readonly builder;
    constructor(errorHandler?: (err: Error) => void);
    _transform(envelope: Envelope, _: BufferEncoding, callback: TransformCallback): void;
    _flush(callback: TransformCallback): void;
}
//# sourceMappingURL=MessagesBuilderStream.d.ts.map