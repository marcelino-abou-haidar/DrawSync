import clsx from 'clsx';
import { ChangeEvent, SetStateAction } from 'react';
import { PiTrashBold } from 'react-icons/pi';
interface CanvasConfigProps {
  colors: string[];
  brushSizes: number[];
  selectedColor: string;
  changeColor: React.Dispatch<SetStateAction<string>>;
  changeBrushSize: React.Dispatch<SetStateAction<number>>;
  clearCanvas: () => void;
}

export const CanvasConfig = ({
  colors,
  brushSizes,
  selectedColor,
  changeColor,
  changeBrushSize,
  clearCanvas,
}: CanvasConfigProps) => {
  const onChangeColor = (color: string) => {
    if (!color) {
      return;
    }

    changeColor(color);
  };

  const onBrushSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (!event.target.value) {
      return;
    }

    changeBrushSize(+event.target.value);
  };

  return (
    <div className=' w-full min-w-32 rounded-r-lg bg-slate-500 p-4 md:max-w-80 lg:min-w-60'>
      <div className='flex w-full flex-col gap-10'>
        <div className='mb-2'>
          <h3 className='mb-2 font-semibold'>Colors</h3>
          <div className='flex flex-wrap gap-2'>
            {colors?.length > 0
              ? colors?.map((color, index) => (
                  <div
                    key={index}
                    data-tooltip-id='tooltip'
                    data-tooltip-content={color}
                    data-tooltip-place='top'
                    style={{ backgroundColor: color }}
                    onClick={() => onChangeColor(color)}
                    className={clsx(
                      `h-6 w-6 cursor-pointer rounded hover:scale-110`,
                      selectedColor === color ? 'border-2 border-black' : '',
                      selectedColor === 'black' && selectedColor === color
                        ? 'border-2 border-red-500'
                        : ''
                    )}
                  ></div>
                ))
              : null}
          </div>
        </div>
        <div className=''>
          <h3 className='mb-2 font-semibold'>Brush size</h3>
          <select
            onChange={onBrushSizeChange}
            name='brush-size'
            id='brush-size'
            className='w-full max-w-36 text-black'
          >
            {brushSizes?.length > 0
              ? brushSizes?.map((brushSize, index) => (
                  <option key={index} value={brushSize}>
                    {brushSize}
                  </option>
                ))
              : null}
          </select>
        </div>
        <div className='flex flex-col justify-end'>
          <h3>Actions</h3>
          <button
            data-tooltip-id='tooltip'
            data-tooltip-content={'Clear canvas'}
            data-tooltip-place='top'
            onClick={clearCanvas}
            className='flex min-w-12 items-center justify-center rounded bg-white px-4 py-2 text-black'
          >
            <PiTrashBold />
          </button>
        </div>
      </div>
    </div>
  );
};
