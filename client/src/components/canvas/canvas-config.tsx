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
  className?: string;
}

export const CanvasConfig = ({
  colors,
  brushSizes,
  selectedColor,
  changeColor,
  changeBrushSize,
  clearCanvas,
  className,
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
    <div
      className={clsx(
        'w-full min-w-32 overflow-auto rounded-t-lg bg-gray-300 -p--space-s md:max-w-80 md:rounded-r-lg md:rounded-tl-none lg:min-w-60',
        className
      )}
    >
      <div className='flex w-full flex-wrap gap-6 md:flex-col'>
        <div className='-mb--space-3xs '>
          <h3 className='-mb--space-3xs -text--step--1 font-semibold'>
            Colors
          </h3>
          <div className='flex max-h-56 flex-wrap gap-2 md:overflow-x-auto'>
            {colors?.length > 0
              ? colors?.map((color, index) => (
                  <div
                    key={index}
                    style={{ backgroundColor: color }}
                    onClick={() => onChangeColor(color)}
                    className={clsx(
                      `h-6 w-6 cursor-pointer rounded-full hover:scale-110`,
                      selectedColor === color ? 'border-2 border-slate-700' : ''
                    )}
                  ></div>
                ))
              : null}
          </div>
        </div>
        <div>
          <h3 className='-mb--space-3xs -text--step--1 font-semibold'>
            Brush size
          </h3>
          <select
            onChange={onBrushSizeChange}
            name='brush-size'
            id='brush-size'
            className='w-full max-w-36 rounded -p--space-3xs text-black'
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
          <h3 className=' -mb--space-3xs -text--step--1 font-semibold'>
            Actions
          </h3>
          <button
            data-tooltip-id='tooltip'
            data-tooltip-content={'Clear canvas'}
            data-tooltip-place='top'
            onClick={clearCanvas}
            className='flex min-w-12 max-w-20 items-center justify-center rounded bg-white px-4 py-2 text-black'
          >
            <PiTrashBold />
          </button>
        </div>
      </div>
    </div>
  );
};
