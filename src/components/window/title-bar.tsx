import { FC, DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import { useRecoilValue } from 'recoil';
import { focusState } from '@/recoil/atoms';
import { WindowProps } from '.';

const minimizeIcon = (
  <div className="h-[0.3vh] aspect-[3/1] mt-auto mb-[0.15vh]">
    <svg
      className="h-full w-full"
      width="6"
      height="2"
      viewBox="0 0 6 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="6" height="2" fill="black" />
    </svg>
  </div>
);

const maximizeIcon = (
  <div className="h-[1.35vh] aspect-square">
    <svg
      className="h-full w-full"
      width="9"
      height="9"
      viewBox="0 0 9 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width="8" height="8" stroke="black" />
      <line x1="1" y1="1.5" x2="8" y2="1.5" stroke="black" />
    </svg>
  </div>
);

const closeIcon = (
  <div className="h-[1.05vh] aspect-[16/14]">
    <svg
      className="h-full w-full"
      width="8"
      height="7"
      viewBox="0 0 8 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line y1="0.5" x2="2" y2="0.5" stroke="black" />
      <line x1="1" y1="1.5" x2="3" y2="1.5" stroke="black" />
      <line x1="2" y1="2.5" x2="4" y2="2.5" stroke="black" />
      <line x1="4" y1="2.5" x2="6" y2="2.5" stroke="black" />
      <line x1="5" y1="1.5" x2="7" y2="1.5" stroke="black" />
      <line x1="6" y1="0.5" x2="8" y2="0.5" stroke="black" />
      <line y1="6.5" x2="2" y2="6.5" stroke="black" />
      <line x1="1" y1="5.5" x2="3" y2="5.5" stroke="black" />
      <line x1="2" y1="4.5" x2="4" y2="4.5" stroke="black" />
      <line x1="4" y1="4.5" x2="6" y2="4.5" stroke="black" />
      <line x1="5" y1="5.5" x2="7" y2="5.5" stroke="black" />
      <line x1="6" y1="6.5" x2="8" y2="6.5" stroke="black" />
      <line x1="3" y1="3.5" x2="5" y2="3.5" stroke="black" />
    </svg>
  </div>
);

const Button: FC<
  DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & { logo: JSX.Element }
> = ({ logo, ...rest }) => {
  return (
    <button
      tabIndex={-1}
      className="group block h-[2.1vh] aspect-[8/7]
					border-solid border-[0.1vh] outline-none
					border-black border-t-white border-l-white 
					active:border-white active:border-t-black 
					active:border-l-black"
      {...rest}
    >
      <div
        className="h-full border-solid border-[0.1vh]
            border-gray border-t-alto border-l-alto
						group-active:border-alto group-active:border-t-gray
						group-active:border-l-gray
        }"
      >
        <div
          className="flex items-center justify-center h-full bg-silver border-solid 
              border-[0.1vh] border-silver group-active:border-silver group-active:pt-[0.15vh] group-active:pl-[0.15vh]"
        >
          {logo}
        </div>
      </div>
    </button>
  );
};

interface TitleBarProps extends WindowProps {
  closeWindow?: () => void;
}

export const TitleBar: FC<TitleBarProps> = ({
  title,
  type,
  icon,
  minimize,
  maximize,
  closeWindow,
  className,
  onMouseDown,
  onMouseUp,
  children,
  ...rest
}) => {
  const focusAtom = useRecoilValue(focusState);

  return (
    <div
      className={`relative flex justify-between items-center h-[2.7vh] w-full ${
        focusAtom === title ? 'bg-blue' : 'bg-gray'
      } px-[0.2999vh] ${className ? ` ${className}` : ''}`}
      {...rest}
    >
      <div
        className="absolute inset-0"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      />
      <div className="flex h-full items-center">
        {(type === 'explorer' || (type === 'properties' && icon)) && (
          <div className="h-[2.4vh] aspect-square">
            <img
              className="h-full w-full"
              src={icon ? icon : '/static/images/icons/folder-opened.png'}
              alt="Window Icon"
            />
          </div>
        )}
        <div className="mr-[2.3988vh] ml-[0.4498vh] pb-[0.4498vh] text-white font-bold text-[1.75vh]">
          {title
            .split('-')
            .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
            .join(' ')}
        </div>
      </div>
      <div className="relative flex">
        {minimize && minimize.visible && <Button logo={minimizeIcon} />}
        {maximize && maximize.visible && <Button logo={maximizeIcon} />}
        <div
          className={
            (minimize && minimize.visible) || (maximize && maximize.visible)
              ? 'ml-[0.2999vh]'
              : ''
          }
        >
          <Button logo={closeIcon} onClick={closeWindow} />
        </div>
      </div>
    </div>
  );
};

TitleBar.defaultProps = {
  minimize: { visible: true, disabled: false },
  maximize: { visible: true, disabled: false },
};
Button;
