import clsx from 'clsx';
import { ChangeEvent, SetStateAction } from 'react';

interface CanvasConfigProps {
  colors: string[];
  brushSizes: number[];
  selectedColor: string;
  changeColor: React.Dispatch<SetStateAction<string>>;
  changeBrushSize: React.Dispatch<SetStateAction<number>>;
}

export const CanvasConfig = ({
  colors,
  brushSizes,
  selectedColor,
  changeColor,
  changeBrushSize,
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
    <div className='bg-slate-500 p-4'>
      <h2 className='mb-2 font-bold'>Configuration</h2>
      <div className='flex w-full gap-10'>
        <div className='mb-2'>
          <h3 className='mb-2 font-semibold'>Colors</h3>
          <div className='flex flex-wrap gap-2'>
            {colors?.length > 0
              ? colors?.map((color, index) => (
                  <div
                    key={index}
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
      </div>
    </div>
  );
};
