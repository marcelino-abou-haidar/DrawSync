import clsx from 'clsx';
import { ChangeEvent, SetStateAction } from 'react';
import { PiTrashBold } from 'react-icons/pi';

type color = {
  name: string;
  hex: string;
  darkerHex: string;
};
interface CanvasConfigProps {
  colors: color[];
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
        'w-full min-w-32 overflow-auto rounded-t-lg border-b-2 border-l-2 border-gray-100 bg-[#fcfcfc] -p--space-s  md:max-w-80 md:rounded-r-lg md:rounded-tl-none lg:min-w-60 lg:max-w-80',
        className
      )}
    >
      <div className='flex w-full flex-wrap gap-6 md:flex-col'>
        <div className='-mb--space-3xs '>
          <h3 className='-text--step--1 font-semibold'>Colors</h3>
          <div className='flex max-h-52 flex-wrap gap-2 -py--space-3xs md:overflow-x-auto'>
            {colors?.length > 0
              ? colors?.map((color, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: color.name,
                      borderColor: color.darkerHex,
                    }}
                    onClick={() => onChangeColor(color.name)}
                    className={clsx(
                      `h-6 w-6 cursor-pointer rounded-full border-2  hover:scale-110`,
                      selectedColor === color.name ? `border-8` : ''
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
            className='w-full max-w-36 rounded border-2 border-gray-100 -p--space-3xs text-black'
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
            className='group flex min-w-12 max-w-20 items-center justify-center rounded-lg border-2 border-gray-100 bg-white px-4 py-2 text-black hover:bg-blue-500'
          >
            <PiTrashBold className=' group-hover:fill-white' />
          </button>
        </div>
      </div>
    </div>
  );
};
