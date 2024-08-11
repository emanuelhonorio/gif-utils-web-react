import GIF from "@fand/gifuct-js";

export class GifUtils {
    static async getFrames(url: string) {
        const gif = await fetch(url)
            .then(resp => resp.arrayBuffer())
            .then(buff => new GIF(buff));

        const frames = await gif.decompressFrames(true);
        return frames;
    }
}