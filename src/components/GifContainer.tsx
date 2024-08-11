import { IGIFFrame } from '@fand/gifuct-js'
import { useEffect, useState } from 'react';

export function GifContainer({ frames }: { frames: IGIFFrame[] }) {
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        const canvas = document.getElementById('gif-canvas') as HTMLCanvasElement;
        const frame = frames[0];
        canvas.width = frame.dims.width;
        canvas.height = frame.dims.height;
        const timeoutID = update();
        return () => {
            clearTimeout(timeoutID);
        };
    }, [frames, opacity]);

 

    const update = () => {
        let i = 0;
        const canvas = document.getElementById('gif-canvas') as HTMLCanvasElement;
        const delay = frames[i].delay;
        return setInterval(() => {
            renderFrame(frames[i], canvas);
            i = (i + 1) % frames.length;
        }, delay);
    }

    const manipulate = (patch: Uint8ClampedArray, opacity: number) => {
        const newPatch = new Uint8ClampedArray(patch.length);
        for (let i = 0; i < patch.length; i += 4) {
            newPatch[i] = patch[i];
            newPatch[i + 1] = patch[i + 1];
            newPatch[i + 2] = patch[i + 2];
            newPatch[i + 3] = patch[i + 3] * opacity;
        }
        return newPatch;
    }

    const renderFrame = (frame: IGIFFrame, canvas: HTMLCanvasElement) => {
        const ctx = canvas.getContext('2d');
        if (ctx) {
            const imageData = ctx.createImageData(frame.dims.width, frame.dims.height);
            const patch = frame.patch;
            const newPatch = manipulate(patch, opacity);
            imageData.data.set(newPatch);
            ctx.putImageData(imageData, 0, 0);
        }
    }

    const onOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOpacity(parseFloat(e.target.value));
    }

    return (
        <>
            <div id='gif-container'>
                <canvas id='gif-canvas' />
            </div>
            <div>
                <label htmlFor="opacity-slider">Opacity</label>
                <input type="range" min="0" max="1" step="0.01" value={opacity} id="opacity-slider" onChange={onOpacityChange} />
            </div>
        </>
    )

}